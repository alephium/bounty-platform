import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Loader2, Edit, Trash, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

// Types for the comment section
interface Comment {
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
  // Added info for bounty
  bounty?: {
    sponsor_id: string;
  };
  sponsor?:{
    user_id: string
  }
}

interface CommentSectionProps {
  bountyId: string;
  sponsorId: string; // Add this to know who the sponsor is
  user: any;
  theme: string;
}

// Comment service functions
const CommentService = {
  getBountyComments: async (bountyId: string): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase
        .from('bounty_comments')
        .select(`
          *,
          user:users(full_name, avatar_url, username),
          bounty:bounties!bounty_comments_bounty_id_fkey(
            sponsor_id,
            sponsor:sponsors(user_id)
          )
        `)
        .eq('bounty_id', bountyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching bounty comments:', error);
      throw error;
    }
  },

  // Also update other methods similarly
  createComment: async (bountyId: string, userId: string, content: string): Promise<Comment> => {
    try {
      const { data, error } = await supabase
        .from('bounty_comments')
        .insert({
          bounty_id: bountyId,
          user_id: userId,
          content: content
        })
        .select(`
          *,
          user:users(full_name, avatar_url, username),
          bounty:bounties!bounty_comments_bounty_id_fkey(
            sponsor_id,
            sponsor:sponsors(user_id)
          )
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  updateComment: async (commentId: string, userId: string, content: string): Promise<Comment> => {
    const { data, error } = await supabase
      .from('bounty_comments')
      .update({ content })
      .eq('id', commentId)
      .eq('user_id', userId) // Security: ensure user owns comment
      .select(`
        *,
        user:users(full_name, avatar_url, username),
        bounty:bounties(sponsor_id)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  deleteComment: async (commentId: string, userId: string): Promise<void> => {
    const { error } = await supabase
      .from('bounty_comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId); // Security: ensure user owns comment

    if (error) throw error;
  }
};

// Comment section component
const CommentSection = ({ bountyId, sponsorId, user, theme }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  
  // Use a ref to store the subscription so we can clean it up properly
  const subscriptionRef = useRef<any>(null);

  // Theme-specific styles
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200';
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600';
  const sponsorBadgeBg = theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-100';
  const sponsorBadgeText = theme === 'dark' ? 'text-amber-400' : 'text-amber-700';

  // Fetch comments initially and set up real-time subscription
  useEffect(() => {
    let isMounted = true;
    
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await CommentService.getBountyComments(bountyId);
        if (isMounted) {
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        if (isMounted) {
          toast.error('Failed to load comments');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchComments();
    
    // Set up real-time subscription
    subscriptionRef.current = supabase
      .channel(`bounty-comments-${bountyId}`)
      .on('postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bounty_comments',
          filter: `bounty_id=eq.${bountyId}`
        }, 
        async (payload) => {
          if (!payload || !payload.new || !payload.new.id) {
            console.error('Invalid payload received:', payload);
            return;
          }
          // When a new comment is added, fetch the complete comment with user data
          try {
            const { data, error } = await supabase
              .from('bounty_comments')
              .select(`
                *,
                user:users(full_name, avatar_url, username),
                bounty:bounties(sponsor_id)
              `)
              .eq('id', payload.new.id)
              .single();
              
            if (error) throw error;
            if (data && isMounted) {
              // Add the new comment to the beginning of the array (newest first)
              setComments(prev => [data, ...prev]);
            }
          } catch (err) {
            console.error('Error processing new comment:', err);
          }
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bounty_comments',
          filter: `bounty_id=eq.${bountyId}`
        },
        async (payload) => {
          try {
            const { data, error } = await supabase
              .from('bounty_comments')
              .select(`
                *,
                user:users(full_name, avatar_url, username),
                bounty:bounties(sponsor_id)
              `)
              .eq('id', payload.new.id)
              .single();
              
            if (error) throw error;
            if (data && isMounted) {
              // Update the modified comment in the state
              setComments(prev => 
                prev.map(comment => 
                  comment.id === data.id ? data : comment
                )
              );
            }
          } catch (err) {
            console.error('Error processing updated comment:', err);
          }
        }
      )
      .on('postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'bounty_comments',
          filter: `bounty_id=eq.${bountyId}`
        },
        (payload) => {
          if (isMounted) {
            // Remove the deleted comment from state
            setComments(prev => 
              prev.filter(comment => comment.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        if (status !== 'SUBSCRIBED') {
          console.error('Failed to subscribe to comments:', status);
        }
      });
    
    // Clean up subscription when component unmounts
    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [bountyId]);

  // Function to post a new comment with immediate UI update
  const postComment = async () => {
    if (!commentText.trim()) return;
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }
  
    const commentContent = commentText.trim();
    setCommentText(''); // Clear input immediately for better UX
    
    // Create an optimistic comment
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      bounty_id: bountyId,
      user_id: user.id,
      content: commentContent,
      created_at: new Date().toISOString(),
      user: {
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        username: user.username
      },
      bounty: {
        sponsor_id: sponsorId
      }
    };
    
    // Add it to the UI immediately
    setComments(prev => [optimisticComment, ...prev]);
  
    try {
      setSubmitting(true);
      
      // Create the comment
      const newComment = await CommentService.createComment(
        bountyId,
        user.id,
        commentContent
      );
      
      // Replace the optimistic comment with the real one
      setComments(prev => 
        prev.map(comment => 
          comment.id === optimisticComment.id ? newComment : comment
        )
      );
      
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
      // Remove the optimistic comment on error
      setComments(prev => prev.filter(comment => comment.id !== optimisticComment.id));
      // Restore the comment text in case of error
      setCommentText(commentContent);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to delete a comment with optimistic UI update
  const deleteComment = async (commentId: string) => {
    if (!user?.id) {
      toast.error('You must be logged in to delete comments');
      return;
    }
    
    // Optimistic UI update - remove comment immediately
    const commentsCopy = [...comments];
    setComments(comments.filter(comment => comment.id !== commentId));
    
    try {
      await CommentService.deleteComment(commentId, user.id);
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
      // Restore comments if the deletion fails
      setComments(commentsCopy);
    }
  };

  // Function to start editing a comment
  const startEditingComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);
  };

  // Function to save edited comment with optimistic UI update
  const saveEditedComment = async () => {
    if (!editingCommentId || !user?.id || !editingCommentText.trim()) return;
    
    const commentId = editingCommentId;
    const newContent = editingCommentText.trim();
    
    // Optimistic UI update
    const originalComments = [...comments];
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, content: newContent } 
        : comment
    ));
    
    // Reset editing state
    setEditingCommentId(null);
    setEditingCommentText('');
    
    try {
      setSubmitting(true);
      await CommentService.updateComment(
        commentId,
        user.id,
        newContent
      );
      toast.success('Comment updated');
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
      // Restore original comments if update fails
      setComments(originalComments);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle keypress to submit on enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      postComment();
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Helper function to get user initials
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  // Helper function to check if a comment is from the sponsor
  const isFromSponsor = (comment: Comment) => {
    console.log("Comment user_id:", comment.user_id);
    console.log("Sponsor data:", comment.sponsor);
    console.log("Bounty data:", comment.bounty);
    console.log("is from sponsor", comment.user_id, comment.sponsor?.user_id);
    return comment.user_id === comment.sponsor?.user_id;
  };

  return (
    <section>
      <div className={`flex items-center gap-2 mb-4 ${textColor}`}>
        <MessageSquare className="w-5 h-5" />
        <h2 className="text-lg font-bold">Discussion ({comments.length})</h2>
      </div>
      
      {/* Comment input */}
      {user ? (
        <div className="flex gap-4 mb-6">
          <Avatar>
            <AvatarImage src={user?.avatar_url || undefined} />
            <AvatarFallback className={`bg-[#C1A461]/20 ${textColor}`}>
              {getInitials(user?.full_name ?? null)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`flex-1 ${bgColor} border ${borderColor} rounded-lg px-4 py-2 ${textColor} placeholder-[#C1A461]/40 focus:outline-none focus:border-[#C1A461]`}
              disabled={submitting}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={postComment}
              disabled={submitting || !commentText.trim()}
              className={`${textColor} hover:bg-[#C1A461]/10`}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      ) : (
        <div className={`text-center p-4 mb-6 border ${borderColor} rounded-lg ${mutedTextColor}`}>
          Please sign in to join the discussion
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className={`h-8 w-8 animate-spin ${textColor}`} />
          </div>
        ) : comments.length === 0 ? (
          <div className={`text-center py-4 ${mutedTextColor}`}>
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <Avatar>
                <AvatarImage src={comment.user?.avatar_url || undefined} />
                <AvatarFallback className={`bg-[#C1A461]/20 ${textColor}`}>
                  {getInitials(comment.user?.full_name ?? null)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${textColor}`}>
                      {comment.user?.full_name || 'Anonymous'}
                    </span>
                    
                    {/* Sponsor badge - add this to indicate when a comment is from the sponsor */}
                    {isFromSponsor(comment) && (
                      <Badge className={`${sponsorBadgeBg} ${sponsorBadgeText} flex items-center gap-1`}>
                        <Award className="h-3 w-3" />
                        <span>Sponsor</span>
                      </Badge>
                    )}
                    
                    <span className={`text-sm ${mutedTextColor}`}>
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  {user?.id === comment.user_id && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditingComment(comment)}
                        className={`${mutedTextColor} hover:${textColor}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteComment(comment.id)}
                        className={`${mutedTextColor} hover:${textColor}`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                {editingCommentId === comment.id ? (
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          saveEditedComment();
                        } else if (e.key === 'Escape') {
                          setEditingCommentId(null);
                          setEditingCommentText('');
                        }
                      }}
                      className={`flex-1 ${bgColor} border ${borderColor} rounded-lg px-4 py-2 ${textColor} focus:outline-none focus:border-[#C1A461]`}
                      disabled={submitting}
                      autoFocus
                    />
                    <Button
                      onClick={saveEditedComment}
                      disabled={submitting || !editingCommentText.trim()}
                      className="bg-[#C1A461] hover:bg-[#C1A461]/90 text-[#1B2228]"
                    >
                      {submitting ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditingCommentText('');
                      }}
                      disabled={submitting}
                      className={`border-${borderColor} ${textColor}`}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <p className={`mt-1 ${textColor}`}>
                    {comment.content}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;