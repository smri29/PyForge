// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import api from '../services/api';
import { ArrowRight, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the shape of a Problem
interface Problem {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const Dashboard = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await api.get('/problems');
        setProblems(data);
      } catch (error) {
        console.error('Failed to fetch problems', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400';
    }
  };

  return (
    <AppLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Learning Path</h1>
        <p className="text-slate-400">Track your progress and conquer AI challenges.</p>
      </header>

      {/* Stats Row (Placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Problems Solved</h3>
          <p className="text-2xl font-bold text-white">0 / {problems.length}</p>
        </div>
        {/* Add more stats later */}
      </div>

      {/* Recent Problems Section */}
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <BrainCircuit className="text-violet-500" />
        Recommended Problems
      </h2>

      {loading ? (
        <div className="text-slate-500">Loading neural pathways...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {problems.map((problem) => (
            <div 
              key={problem._id}
              onClick={() => navigate(`/problems/${problem._id}`)}
              className="group bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-violet-500/50 hover:bg-slate-800/50 transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">{problem.category}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <ArrowRight className="text-slate-600 group-hover:text-white transition-colors w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;