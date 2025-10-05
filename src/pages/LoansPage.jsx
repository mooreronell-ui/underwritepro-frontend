import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLoanStore } from '../lib/store';
import toast from 'react-hot-toast';
import { Plus, Search, FileText, Clock, CheckCircle, XCircle, DollarSign, Calendar } from 'lucide-react';

export default function LoansPage() {
  const { loans, loading, fetchLoans } = useLoanStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      await fetchLoans();
    } catch (error) {
      toast.error('Failed to load loans');
    }
  };

  // Mock data for demo purposes
  const mockLoans = [
    {
      id: 1,
      borrower_name: 'John Smith',
      company_name: 'Tech Innovations LLC',
      loan_amount: 500000,
      status: 'pending',
      created_at: '2025-01-15',
      loan_purpose: 'Business Expansion'
    },
    {
      id: 2,
      borrower_name: 'Sarah Johnson',
      company_name: 'Retail Solutions Inc',
      loan_amount: 750000,
      status: 'approved',
      created_at: '2025-01-10',
      loan_purpose: 'Property Purchase'
    },
    {
      id: 3,
      borrower_name: 'Michael Brown',
      company_name: 'Manufacturing Co',
      loan_amount: 1200000,
      status: 'under_review',
      created_at: '2025-01-12',
      loan_purpose: 'Equipment Purchase'
    },
  ];

  const displayLoans = loans.length > 0 ? loans : mockLoans;

  const filteredLoans = displayLoans.filter(loan => {
    const matchesSearch = loan.borrower_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || loan.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary', icon: Clock, color: 'text-orange-600 bg-orange-50' },
      under_review: { label: 'Under Review', variant: 'default', icon: FileText, color: 'text-blue-600 bg-blue-50' },
      approved: { label: 'Approved', variant: 'default', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
      rejected: { label: 'Rejected', variant: 'destructive', icon: XCircle, color: 'text-red-600 bg-red-50' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  const filterOptions = [
    { value: 'all', label: 'All Loans', count: displayLoans.length },
    { value: 'pending', label: 'Pending', count: displayLoans.filter(l => l.status === 'pending').length },
    { value: 'under_review', label: 'Under Review', count: displayLoans.filter(l => l.status === 'under_review').length },
    { value: 'approved', label: 'Approved', count: displayLoans.filter(l => l.status === 'approved').length },
    { value: 'rejected', label: 'Rejected', count: displayLoans.filter(l => l.status === 'rejected').length },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loan Applications</h1>
            <p className="text-gray-600 mt-1">Manage and track all your loan applications</p>
          </div>
          <Link to="/loans/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${filter === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {option.label}
              <span className={`ml-2 ${filter === option.value ? 'text-blue-100' : 'text-gray-500'}`}>
                ({option.count})
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by borrower or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Loans List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading loans...</p>
          </div>
        ) : filteredLoans.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No loans found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search' : 'Get started by creating your first loan application'}
              </p>
              {!searchTerm && (
                <Link to="/loans/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Loan Application
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredLoans.map((loan) => (
              <Card key={loan.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{loan.borrower_name}</h3>
                          <p className="text-sm text-gray-600">{loan.company_name}</p>
                        </div>
                        {getStatusBadge(loan.status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-medium text-gray-900">
                            ${loan.loan_amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FileText className="w-4 h-4 mr-2 text-blue-600" />
                          <span>{loan.loan_purpose}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                          <span>{new Date(loan.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
