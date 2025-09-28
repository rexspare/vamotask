import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import OrderTracking from './components/OrderTracking/OrderTracking'
import { findOrderById } from './data/orderData'

// Component to handle order tracking with URL parameter
const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  
  if (!orderId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order ID Required</h1>
          <p className="text-gray-400">Please provide a valid order ID in the URL</p>
        </div>
      </div>
    )
  }

  const orderData = findOrderById(orderId)
  
  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-400 mb-4">Order ID "{orderId}" does not exist</p>
          <p className="text-sm text-gray-500">Available order IDs: ORD-2024-001234, ORD-2024-001235, ORD-2024-001236</p>
        </div>
      </div>
    )
  }

  return <OrderTracking orderData={orderData} />
}

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='container-index container-content'>
          <Routes>
            <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
            <Route path="/" element={
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-6">Order Tracking System</h1>
                  <p className="text-gray-400 mb-8">Enter an order ID in the URL to track your order</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>Example URLs:</p>
                    <p>/order-tracking/ORD-2024-001234</p>
                    <p>/order-tracking/ORD-2024-001235</p>
                    <p>/order-tracking/ORD-2024-001236</p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App