'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../api/admin.api';
import { Ticket, ArtistVerification, FinancialReport, SystemStats } from '../types/admin.types';

interface AdminDashboardProps {
  isAdmin?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isAdmin = false }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'verifications' | 'financials' | 'stats'>('tickets');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [verifications, setVerifications] = useState<ArtistVerification[]>([]);
  const [financials, setFinancials] = useState<FinancialReport[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [ticketsData, verificationsData, financialsData, statsData] = await Promise.all([
        adminService.getTickets(),
        adminService.getVerificationRequests(),
        adminService.getFinancialReports(),
        adminService.getSystemStats(),
      ]);
      setTickets(ticketsData);
      setVerifications(verificationsData);
      setFinancials(financialsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (ticketId: string) => {
    if (!replyMessage.trim()) return;
    try {
      await adminService.replyToTicket(ticketId, replyMessage);
      setReplyMessage('');
      await loadData();
    } catch (error) {
      console.error('Failed to reply:', error);
    }
  };

  const handleVerify = async (verificationId: string, approved: boolean) => {
    try {
      await adminService.verifyArtist(verificationId, approved);
      await loadData();
    } catch (error) {
      console.error('Failed to verify:', error);
    }
  };

  const handleMarkPaid = async (reportId: string) => {
    try {
      await adminService.markPaymentAsPaid(reportId);
      await loadData();
    } catch (error) {
      console.error('Failed to mark paid:', error);
    }
  };

  if (isLoading) {
    return <div className="text-white text-center p-8">Loading admin dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        {isAdmin ? '👑 Admin Dashboard' : '🛡️ Support Dashboard'}
      </h1>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Users</p>
            <p className="text-white text-2xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Artists</p>
            <p className="text-white text-2xl font-bold">{stats.totalArtists}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Premium Users</p>
            <p className="text-white text-2xl font-bold">{stats.premiumUsers}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Monthly Revenue</p>
            <p className="text-green-500 text-2xl font-bold">${stats.monthlyRevenue}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'tickets'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Tickets ({tickets.filter(t => t.status === 'open').length})
        </button>
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'verifications'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Verifications ({verifications.filter(v => v.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('financials')}
          className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
            activeTab === 'financials'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Financial Reports
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'stats'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Advanced Settings
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold">{ticket.subject}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      ticket.status === 'open' ? 'bg-yellow-500' :
                      ticket.status === 'answered' ? 'bg-blue-500' : 'bg-gray-500'
                    } text-white`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">From: {ticket.userName}</p>
                  <p className="text-gray-300 mt-2">{ticket.message}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                  className="text-gray-400 hover:text-white"
                >
                  {selectedTicket === ticket.id ? '−' : '+'}
                </button>
              </div>
              
              {selectedTicket === ticket.id && (
                <div className="mt-4">
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none"
                    rows={3}
                  />
                  <button
                    onClick={() => handleReply(ticket.id)}
                    className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition"
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'verifications' && (
        <div className="space-y-4">
          {verifications.map((verification) => (
            <div key={verification.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">{verification.artistName}</h3>
                  <p className="text-gray-400 text-sm">{verification.email}</p>
                  <a href={verification.sampleWork} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-400 hover:text-blue-300 text-sm">
                    📎 View Sample Work
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleVerify(verification.id, true)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleVerify(verification.id, false)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'financials' && (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-300">Artist</th>
                <th className="px-4 py-2 text-left text-gray-300">Listeners</th>
                <th className="px-4 py-2 text-left text-gray-300">Streams</th>
                <th className="px-4 py-2 text-left text-gray-300">Revenue</th>
                <th className="px-4 py-2 text-left text-gray-300">Status</th>
                <th className="px-4 py-2 text-left text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {financials.map((report) => (
                <tr key={report.artistId} className="border-t border-gray-700">
                  <td className="px-4 py-2 text-white">{report.artistName}</td>
                  <td className="px-4 py-2 text-gray-300">{report.uniqueListeners}</td>
                  <td className="px-4 py-2 text-gray-300">{report.totalStreams}</td>
                  <td className="px-4 py-2 text-green-400">${report.totalRevenue}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      report.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                    } text-white`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {isAdmin && report.status === 'pending' && (
                      <button
                        onClick={() => handleMarkPaid(report.artistId)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded transition"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'stats' && isAdmin && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Subscription Price Management</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Silver Price ($)</label>
              <input
                type="number"
                defaultValue="9.99"
                className="w-full md:w-64 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Gold Price ($)</label>
              <input
                type="number"
                defaultValue="19.99"
                className="w-full md:w-64 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                step="0.01"
                min="0"
              />
            </div>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition">
              Update Prices
            </button>
          </div>
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <p className="text-gray-300 text-sm">📊 User Distribution</p>
            {stats && (
              <div className="flex space-x-2 mt-2">
                <div className="flex-1 bg-blue-500 h-4 rounded" style={{ width: `${(stats.userDistribution.free / stats.totalUsers) * 100}%` }} />
                <div className="flex-1 bg-gray-400 h-4 rounded" style={{ width: `${(stats.userDistribution.silver / stats.totalUsers) * 100}%` }} />
                <div className="flex-1 bg-yellow-500 h-4 rounded" style={{ width: `${(stats.userDistribution.gold / stats.totalUsers) * 100}%` }} />
              </div>
            )}
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Free</span>
              <span>Silver</span>
              <span>Gold</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};