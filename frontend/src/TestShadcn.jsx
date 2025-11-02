import React from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

const TestShadcn = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Testing Shadcn Components</h1>
      
      {/* Test with inline styles */}
      <div style={{ marginBottom: '20px' }}>
        <button style={{
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}>
          Regular Button (Styled)
        </button>
      </div>

      {/* Test shadcn button */}
      <div style={{ marginBottom: '20px' }}>
        <Button>Shadcn Button</Button>
      </div>

      {/* Test shadcn card */}
      <Card style={{ maxWidth: '300px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <CardHeader style={{ padding: '16px' }}>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent style={{ padding: '16px' }}>
          <p>This is a test card to see if shadcn components work.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestShadcn;