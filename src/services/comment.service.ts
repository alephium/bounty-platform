// src/services/comment.service.ts
import { supabase } from "../lib/supabase";

export interface Comment {
  id: string;
  bounty_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: {
    full_name: string | null;
    avatar_url: string | null;
    username: string | null;
  };
}

export class CommentService {
  /**
   * Gets all comments for a bounty
   */
  static async getBountyComments(bountyId: string): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('bounty_comments')
        .select(`
          *,
          user:users(full_name, avatar_url, username)
        `)
        .eq('bounty_id', bountyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching bounty comments:', error);
      throw error;
    }
  }

  /**
   * Creates a new comment
   */
  static async createComment(
    bountyId: string, 
    userId: string, 
    content: string
  ): Promise<Comment> {
    try {
      // Validation
      if (!bountyId || !userId || !content.trim()) {
        throw new Error('Missing required fields');
      }

      const { data, error } = await supabase
        .from('bounty_comments')
        .insert({
          bounty_id: bountyId,
          user_id: userId,
          content: content.trim()
        })
        .select(`
          *,
          user:users(full_name, avatar_url, username)
        `)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create comment');
      
      return data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  /**
   * Updates an existing comment
   */
  static async updateComment(
    commentId: string, 
    userId: string, 
    content: string
  ): Promise<Comment> {
    try {
      // Validation
      if (!commentId || !userId || !content.trim()) {
        throw new Error('Missing required fields');
      }
      
      // First verify that the user owns this comment
      const { data: existingComment, error: checkError } = await supabase
        .from('bounty_comments')
        .select('id')
        .eq('id', commentId)
        .eq('user_id', userId)
        .single();
        
      if (checkError || !existingComment) {
        throw new Error('You do not have permission to edit this comment');
      }

      // Update the comment
      const { data, error } = await supabase
        .from('bounty_comments')
        .update({ content: content.trim() })
        .eq('id', commentId)
        .select(`
          *,
          user:users(full_name, avatar_url, username)
        `)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update comment');
      
      return data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  /**
   * Deletes a comment
   */
  static async deleteComment(commentId: string, userId: string): Promise<void> {
    try {
      // Validation
      if (!commentId || !userId) {
        throw new Error('Missing required fields');
      }
      
      // First verify that the user owns this comment
      const { data: existingComment, error: checkError } = await supabase
        .from('bounty_comments')
        .select('id')
        .eq('id', commentId)
        .eq('user_id', userId)
        .single();
        
      if (checkError || !existingComment) {
        throw new Error('You do not have permission to delete this comment');
      }

      // Delete the comment
      const { error } = await supabase
        .from('bounty_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}