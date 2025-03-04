import { supabase } from '../lib/supabase'
import { BountyComment } from '../types/supabase'

export class CommentService {
  static async getBountyComments(bountyId: string) {
    try {
      const { data, error } = await supabase
        .from('bounty_comments')
        .select(`
          *,
          user:users(id, full_name, avatar_url, username)
        `)
        .eq('bounty_id', bountyId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching bounty comments:', error)
      throw error
    }
  }

  static async createComment(
    bountyId: string, 
    userId: string, 
    content: string
  ) {
    try {
      const { data, error } = await supabase
        .from('bounty_comments')
        .insert({
          bounty_id: bountyId,
          user_id: userId,
          content: content
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating comment:', error)
      throw error
    }
  }

  static async updateComment(
    commentId: string, 
    userId: string, 
    content: string
  ) {
    try {
      const { data, error } = await supabase
        .from('bounty_comments')
        .update({ content })
        .eq('id', commentId)
        .eq('user_id', userId) // Security check
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating comment:', error)
      throw error
    }
  }

  static async deleteComment(commentId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('bounty_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', userId) // Security check

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
  }

  static async getCommentCount(bountyId: string) {
    try {
      const { count, error } = await supabase
        .from('bounty_comments')
        .select('id', { count: 'exact' })
        .eq('bounty_id', bountyId)

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error counting comments:', error)
      throw error
    }
  }
}