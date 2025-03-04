import { useState, useEffect } from 'react';
import { CommentService } from '../services/comment.service';
import { MessageSquare, Send, Loader2, Edit, Trash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

// Types for the comment section
interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: {
    full_name: string | null;
    avatar_url: string | null;
    username: string | null;
  };
}

interface CommentSectionProps {
  bountyId: string;
  user: any;
  theme: string;
}

// Comment section component
const CommentSection = ({ bountyId, user, theme }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  // Theme-specific styles
  const textColor = theme === 'dark' ? 'text-[#C1A461]' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-[#1B2228]' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-[#C1A461]/20' : 'border-amber-200';
  const mutedTextColor = theme === 'dark' ? 'text-[#C1A461]/60' : 'text-gray-600';

  // Fetch comments and set up real-time subscription
  useEffect(() => {
    fetchComments();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel(`bounty-comments-${bountyId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'bounty_comments',
        filter: `bounty_id=eq.${bountyId}`
      }, () => {
        // Refresh comments when there's any change
        fetchComments();
      })
      .subscribe();
    
    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [bountyId]);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await CommentService.getBountyComments(bountyId);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  // Function to post a new comment
  const postComment = async () => {
    if (!commentText.trim()) return;
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }

    try {
      setSubmitting(true);
      await CommentService.createComment(
        bountyId,
        user.id,
        commentText.trim()
      );

      // Clear input after submission
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  // Function to delete a comment
  const deleteComment = async (commentId: string) => {
    if (!user?.id) {
      toast.error('You must be logged in to delete comments');
      return;
    }
    
    try {
      await CommentService.deleteComment(commentId, user.id);
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  // Function to start editing a comment
  const startEditingComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);
  };

  // Function to save edited comment
  const saveEditedComment = async () => {
    if (!editingCommentId || !user?.id || !editingCommentText.trim()) return;
    
    try {
      setSubmitting(true);
      await CommentService.updateComment(
        editingCommentId,
        user.id,
        editingCommentText.trim()
      );
      
      // Reset editing state
      setEditingCommentId(null);
      setEditingCommentText('');
      toast.success('Comment updated');
    } catch (error) {
      console.error('Error updating comment:', error);
      toast.error('Failed to update comment');
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
              {user?.full_name?.charAt(0) || 'U'}
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