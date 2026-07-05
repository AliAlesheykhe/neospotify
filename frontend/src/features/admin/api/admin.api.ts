//import axios from 'axios';
import { Ticket, ArtistVerification, FinancialReport, SystemStats, SubscriptionPrice } from '../types/admin.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    subject: 'Payment Issue',
    message: 'I cannot upgrade my subscription',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    subject: 'Account Verification',
    message: 'Please verify my artist account',
    status: 'answered',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockVerifications: ArtistVerification[] = [
  {
    id: '1',
    artistId: 'artist1',
    artistName: 'John Artist',
    email: 'john@artist.com',
    sampleWork: 'https://soundcloud.com/john',
    status: 'pending',
    submittedAt: new Date()
  }
];

export const adminService = {
  // Tickets
  async getTickets(): Promise<Ticket[]> {
    console.log('Fetching tickets...');
    return mockTickets;
  },

  async replyToTicket(ticketId: string, message: string): Promise<void> {
    console.log(`Replying to ticket ${ticketId}:`, message);
  },

  // Verifications
  async getVerificationRequests(): Promise<ArtistVerification[]> {
    console.log('Fetching verifications...');
    return mockVerifications;
  },

  async verifyArtist(verificationId: string, approved: boolean, notes?: string): Promise<void> {
    console.log(`Verifying artist ${verificationId}:`, approved, notes);
  },

  // Financials
  async getFinancialReports(): Promise<FinancialReport[]> {
    return [
      {
        artistId: '1',
        artistName: 'John Artist',
        uniqueListeners: 1500,
        totalStreams: 5000,
        totalRevenue: 250.50,
        status: 'pending',
        month: 'June',
        year: 2026
      }
    ];
  },

  async markPaymentAsPaid(reportId: string): Promise<void> {
    console.log('Marking payment as paid:', reportId);
  },

  // System
  async getSystemStats(): Promise<SystemStats> {
    return {
      totalUsers: 1500,
      totalArtists: 45,
      totalTracks: 320,
      totalAlbums: 85,
      premiumUsers: 320,
      monthlyRevenue: 4850.75,
      userDistribution: {
        free: 1180,
        silver: 210,
        gold: 110
      }
    };
  },

  async getSubscriptionPrices(): Promise<SubscriptionPrice> {
    return {
      silver: 9.99,
      gold: 19.99,
      updatedAt: new Date()
    };
  },

  async updateSubscriptionPrices(silver: number, gold: number): Promise<SubscriptionPrice> {
    console.log('Updating prices:', { silver, gold });
    return {
      silver,
      gold,
      updatedAt: new Date()
    };
  }
};