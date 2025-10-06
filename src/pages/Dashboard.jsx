import React, { useState, useEffect } from 'react';
import { loanAPI } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentLoans, setRecentLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, loansData] = await Promise.all([
        loanAPI.getStats(),
        loanAPI.getAll({ limit: 5, sort: '-created_at' }),
      ]);
      
      setStats(statsData.data);
      setRecentLoans(loansData.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (rating) => {
    const colors = {
      'Exceptional': theme.colors.success,
      'Good': theme.colors.success,
      'Acceptable': theme.colors.warning,
      'Marginal': theme.colors.warning,
      'Unacceptable': theme.colors.danger,
    };
    return colors[rating] || theme.colors.neutral[400];
  };

  const getStatusColor = (status) => {
    const colors = {
      'approved': theme.colors.success,
      'pending': theme.colors.warning,
      'declined': theme.colors.danger,
      'under_review': theme.colors.info,
    };
    return colors[status] || theme.colors.neutral[400];
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ fontSize: '18px', color: theme.colors.neutral[600] }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: theme.colors.primary[900], marginBottom: '8px' }}>
          Welcome back, {user?.full_name || 'there'}! 👋
        </h1>
        <p style={{ fontSize: '16px', color: theme.colors.neutral[600] }}>
          Here's what's happening with your loans today
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <StatCard
          title="Total Loans"
          value={stats?.total_count || 0}
          subtitle="All applications"
          icon="📊"
          gradient={`linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[800]} 100%)`}
        />
        <StatCard
          title="Pending Review"
          value={stats?.pending_count || 0}
          subtitle="Awaiting decision"
          icon="⏳"
          gradient={`linear-gradient(135deg, ${theme.colors.warning} 0%, #F97316 100%)`}
        />
        <StatCard
          title="Approved"
          value={stats?.approved_count || 0}
          subtitle="Ready to fund"
          icon="✅"
          gradient={`linear-gradient(135deg, ${theme.colors.success} 0%, #059669 100%)`}
        />
        <StatCard
          title="Total Value"
          value={`$${((stats?.total_amount || 0) / 1000000).toFixed(1)}M`}
          subtitle="Loan portfolio"
          icon="💰"
          gradient={`linear-gradient(135deg, ${theme.colors.accent.gold} 0%, #D97706 100%)`}
        />
      </div>

      {/* Recent Loans Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: theme.shadows.md,
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '24px', 
          borderBottom: `1px solid ${theme.colors.neutral[200]}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.primary[900] }}>
            Recent Loan Applications
          </h2>
          <button style={{
            padding: '8px 16px',
            backgroundColor: theme.colors.primary[600],
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}>
            View All
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: theme.colors.neutral[50] }}>
                <th style={tableHeaderStyle}>Borrower</th>
                <th style={tableHeaderStyle}>Loan Amount</th>
                <th style={tableHeaderStyle}>Type</th>
                <th style={tableHeaderStyle}>DSCR</th>
                <th style={tableHeaderStyle}>LTV</th>
                <th style={tableHeaderStyle}>Risk Rating</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLoans.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '48px', textAlign: 'center', color: theme.colors.neutral[500] }}>
                    No loan applications yet. Create your first one to get started!
                  </td>
                </tr>
              ) : (
                recentLoans.map((loan, index) => (
                  <tr key={loan.id} style={{ borderBottom: `1px solid ${theme.colors.neutral[100]}` }}>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: '500', color: theme.colors.primary[900] }}>
                        {loan.borrower_name || 'N/A'}
                      </div>
                      <div style={{ fontSize: '12px', color: theme.colors.neutral[500] }}>
                        {loan.borrower_company || ''}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: '600', color: theme.colors.primary[900] }}>
                        ${(loan.loan_amount / 1000).toFixed(0)}K
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{ 
                        fontSize: '12px', 
                        padding: '4px 8px', 
                        backgroundColor: theme.colors.neutral[100],
                        borderRadius: '4px',
                        color: theme.colors.neutral[700]
                      }}>
                        {loan.loan_type?.replace('_', ' ') || 'N/A'}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: '500' }}>
                        {loan.dscr ? loan.dscr.toFixed(2) : 'N/A'}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ fontWeight: '500' }}>
                        {loan.ltv ? `${loan.ltv.toFixed(1)}%` : 'N/A'}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: `${getRiskColor(loan.risk_rating)}20`,
                        color: getRiskColor(loan.risk_rating),
                      }}>
                        {loan.risk_rating || 'Not Assessed'}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: `${getStatusColor(loan.status)}20`,
                        color: getStatusColor(loan.status),
                      }}>
                        {loan.status?.replace('_', ' ').toUpperCase() || 'PENDING'}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ fontSize: '14px', color: theme.colors.neutral[600] }}>
                        {new Date(loan.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon, gradient }) => (
  <div style={{
    background: gradient,
    borderRadius: '12px',
    padding: '24px',
    color: 'white',
    boxShadow: theme.shadows.lg,
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{ fontSize: '36px', marginBottom: '8px', opacity: 0.9 }}>{icon}</div>
    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px', opacity: 0.95 }}>{title}</div>
    <div style={{ fontSize: '12px', opacity: 0.8 }}>{subtitle}</div>
  </div>
);

const tableHeaderStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: '600',
  color: theme.colors.neutral[600],
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableCellStyle = {
  padding: '16px',
  fontSize: '14px',
  color: theme.colors.neutral[700],
};

export default Dashboard;
