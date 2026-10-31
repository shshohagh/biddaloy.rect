import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PostNoticeModal: React.FC = () => {
  const { isNoticeOpen, setIsNoticeOpen, handlePostNotice } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All' as const,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isNoticeOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    await handlePostNotice({
      title: formData.title,
      content: formData.content,
      targetAudience: formData.targetAudience,
      date: new Date().toISOString().split('T')[0],
    });

    setIsSubmitting(false);
    setIsNoticeOpen(false);
    setFormData({ title: '', content: '', targetAudience: 'All' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#083327] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Post Announcement / Notice</h3>
              <p className="text-xs text-[#a3c9be]">Broadcast to students & parents</p>
            </div>
          </div>
          <button
            onClick={() => setIsNoticeOpen(false)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Notice Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Leave on Monday, Parent Teacher Meeting"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Target Audience
            </label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
            >
              <option value="All">All (Students, Parents, Teachers)</option>
              <option value="Students">Students Only</option>
              <option value="Parents">Parents Only</option>
              <option value="Teachers">Teachers Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Announcement Message *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Type notice message here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#00a896]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNoticeOpen(false)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              {isSubmitting ? 'Posting...' : 'Publish Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
