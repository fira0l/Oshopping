import React from 'react';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Mail, Phone, MapPin, Calendar, User } from 'lucide-react';

// Define the GraphQL query to fetch user data
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      user_id
      username
      email
      first_name
      last_name
      address
      phone_number
      registration_date
    }
  }
`;

const Customers = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
    },
    {
      title: 'Registration Date',
      dataIndex: 'registration_date',
      render: (registrationDate) => {
        // Log the raw registration date for debugging
        console.log('Raw registration date:', registrationDate);

        // Convert and format the registration date
        const formattedDate = moment(Number(registrationDate)).isValid()
          ? moment(Number(registrationDate)).format('YYYY-MM-DD')
          : 'Invalid Date';

        // Log the formatted date for debugging
        console.log('Formatted registration date:', formattedDate);

        return formattedDate;
      },
    },

  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading customers...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center text-destructive">
        <p>Error loading customers: {error.message}</p>
      </div>
    </div>
  );

  // Map fetched data to the required format for the Table component
  const formattedData = data.users.map((user, index) => ({
    key: index,
    ...user,
  }));

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {formattedData.length} Customers
        </Badge>
      </div>

      <div className="grid gap-4">
        {formattedData.map((customer) => (
          <Card key={customer.user_id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {customer.first_name} {customer.last_name}
                <Badge variant="secondary" className="ml-auto">
                  ID: {customer.user_id}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Username:</span>
                    <span className="font-medium">{customer.username}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{customer.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{customer.phone_number || 'Not provided'}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">{customer.address || 'Not provided'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Registered:</span>
                    <span className="font-medium">
                      {moment(Number(customer.registration_date)).isValid()
                        ? moment(Number(customer.registration_date)).format('MMM DD, YYYY')
                        : 'Invalid Date'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;
