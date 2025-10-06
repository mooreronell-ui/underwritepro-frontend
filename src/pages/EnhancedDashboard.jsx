import React, { useState, useEffect } from 'react';
import { colors, gradients, shadows } from '../theme';

const EnhancedDashboard = () => {
  const [stats, setStats] = useState({
    totalLoans: 0,
    pendingReview: 0,
    approved: 0,
    totalValue: 0,
  });

  const [recentLoans, setRecentLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data from API
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/loans/stats');
      // const data = await response.json();
      
      // Mock data for now
      setStats({
        totalLoans: 47,
        pendingReview: 12,
        approved: 28,
        totalValue: 12500000,
      });

      setRecentLoans([
        {
          id: 1,
          borrower: 'Acme Corporation',
          amount: 500000,
          type: 'Commercial Real Estate',
          status: 'pending',
          dscr: 1.45,
          ltv: 75,
          riskScore: 82,
          date: '2025-10-05',
        },
        {
          id: 2,
          borrower: 'Tech Innovations LLC',
          amount: 750000,
          type: 'Equipment Financing',
          status: 'approved',
          dscr: 1.65,
          ltv: 70,
          riskScore: 88,
          date: '2025-10-04',
        },
        {
          id: 3,
          borrower: 'Retail Solutions Inc',
          amount: 350000,
          type: 'Working Capital',
          status: 'under_review',
          dscr: 1.25,
          ltv: 0,
          riskScore: 75,
          date: '2025-10-03',
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return colors.success[500];
      case 'pending':
        return colors.warning[500];
      case 'declined':
        return colors.danger[500];
      case 'under_review':
        return colors.info[500];
      default:
        return colors.neutral[500];
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'declined':
        return 'Declined';
      case 'under_review':
        return 'Under Review';
      default:
        return status;
    }
  };

  const getRiskRating = (score) => {
    if (score >= 90) return { text: 'Exceptional', color: colors.success[600] };
    if (score >= 80) return { text: 'Good', color: colors.success[500] };
    if (score >= 70) return { text: 'Acceptable', color: colors.warning[500] };
    if (score >= 60) return { text: 'Marginal', color: colors.warning[600] };
    return { text: 'Unacceptable', color: colors.danger[500] };
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: colors.background.secondary,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: `4px solid ${colors.primary[200]}`,
            borderTop: `4px solid ${colors.primary[600]}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}></div>
          <p style={{ marginTop: '20px', color: colors.text.secondary }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background.secondary,
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: colors.text.primary,
          marginBottom: '8px',
        }}>
          Dashboard
        </h1>
        <p style={{ color: colors.text.secondary }}>
          Welcome back! Here's what's happening with your loans.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Total Loans */}
        <div style={{
          background: colors.white,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: shadows.md,
          border: `1px solid ${colors.border.light}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: colors.text.secondary, fontSize: '14px', marginBottom: '8px' }}>
                Total Loans
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: colors.primary[900] }}>
                {stats.totalLoans}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colors.primary[50],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px' }}>📊</span>
            </div>
          </div>
          <p style={{ color: colors.success[600], fontSize: '14px', marginTop: '12px' }}>
            ↑ 12% from last month
          </p>
        </div>

        {/* Pending Review */}
        <div style={{
          background: colors.white,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: shadows.md,
          border: `1px solid ${colors.border.light}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: colors.text.secondary, fontSize: '14px', marginBottom: '8px' }}>
                Pending Review
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: colors.warning[600] }}>
                {stats.pendingReview}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colors.warning[50],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px' }}>⏳</span>
            </div>
          </div>
          <p style={{ color: colors.text.tertiary, fontSize: '14px', marginTop: '12px' }}>
            Requires attention
          </p>
        </div>

        {/* Approved */}
        <div style={{
          background: colors.white,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: shadows.md,
          border: `1px solid ${colors.border.light}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: colors.text.secondary, fontSize: '14px', marginBottom: '8px' }}>
                Approved This Month
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: colors.success[600] }}>
                {stats.approved}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colors.success[50],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px' }}>✅</span>
            </div>
          </div>
          <p style={{ color: colors.success[600], fontSize: '14px', marginTop: '12px' }}>
            85% approval rate
          </p>
        </div>

        {/* Total Value */}
        <div style={{
          background: gradients.premium,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: shadows.lg,
          color: colors.white,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9 }}>
                Total Loan Value
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700' }}>
                {formatCurrency(stats.totalValue)}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px' }}>💰</span>
            </div>
          </div>
          <p style={{ fontSize: '14px', marginTop: '12px', opacity: 0.9 }}>
            ↑ $2.1M from last month
          </p>
        </div>
      </div>

      {/* Recent Loans Table */}
      <div style={{
        background: colors.white,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: shadows.md,
        border: `1px solid ${colors.border.light}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.text.primary }}>
            Recent Loan Applications
          </h2>
          <button style={{
            padding: '8px 16px',
            background: colors.primary[600],
            color: colors.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: shadows.sm,
          }}>
            View All
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colors.border.light}` }}>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  Borrower
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  Amount
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  Type
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  DSCR
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  LTV
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  Risk Score
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  Status
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: colors.text.secondary, fontSize: '14px', fontWeight: '600' }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLoans.map((loan) => {
                const riskRating = getRiskRating(loan.riskScore);
                return (
                  <tr key={loan.id} style={{
                    borderBottom: `1px solid ${colors.border.light}`,
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.neutral[50]}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px', color: colors.text.primary, fontWeight: '500' }}>
                      {loan.borrower}
                    </td>
                    <td style={{ padding: '16px', color: colors.text.primary, fontWeight: '600' }}>
                      {formatCurrency(loan.amount)}
                    </td>
                    <td style={{ padding: '16px', color: colors.text.secondary }}>
                      {loan.type}
                    </td>
                    <td style={{ padding: '16px', color: colors.text.primary }}>
                      {loan.dscr.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px', color: colors.text.primary }}>
                      {loan.ltv > 0 ? `${loan.ltv}%` : 'N/A'}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '600', color: colors.text.primary }}>
                          {loan.riskScore}
                        </span>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: `${riskRating.color}20`,
                          color: riskRating.color,
                        }}>
                          {riskRating.text}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        background: `${getStatusColor(loan.status)}20`,
                        color: getStatusColor(loan.status),
                      }}>
                        {getStatusText(loan.status)}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: colors.text.secondary }}>
                      {new Date(loan.date).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EnhancedDashboard;
