import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  Package, 
  CheckCircle, 
  Truck, 
  ChefHat,
  User,
  Navigation
} from 'lucide-react';
import type { OrderTrackingData } from '../../data/orderData';

interface OrderTrackingProps {
  orderData: OrderTrackingData;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeUntilDelivery, setTimeUntilDelivery] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateTimeUntilDelivery = () => {
      const now = new Date();
      const deliveryTime = new Date();
      const [hours, minutes] = orderData.estimatedDelivery.split(':');
      deliveryTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      if (deliveryTime < now) {
        setTimeUntilDelivery('Arriving soon!');
        return;
      }

      const diff = deliveryTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hoursLeft > 0) {
        setTimeUntilDelivery(`${hoursLeft}h ${minutesLeft}m`);
      } else {
        setTimeUntilDelivery(`${minutesLeft}m`);
      }
    };

    calculateTimeUntilDelivery();
  }, [currentTime, orderData.estimatedDelivery]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <ChefHat className="w-5 h-5" />;
      case 'ready':
        return <Package className="w-5 h-5" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'text-yellow-500';
      case 'ready':
        return 'text-blue-500';
      case 'out_for_delivery':
        return 'text-green-500';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 max-w-md sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">Track Your Order</h1>
        <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Order #{orderData.orderId}</p>
      </motion.div>

      {/* Delivery Window Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 lg:mb-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            <span className="font-semibold text-white text-base sm:text-lg lg:text-xl">Delivery Window</span>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-white font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl">{timeUntilDelivery}</div>
            <div className="text-blue-100 text-sm sm:text-base lg:text-lg mt-1">until estimated arrival</div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
            {formatTime(orderData.deliveryWindow.start)} - {formatTime(orderData.deliveryWindow.end)}
          </div>
          <div className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl">Expected: {formatTime(orderData.estimatedDelivery)}</div>
        </div>
      </motion.div>

      {/* Current Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 lg:mb-16"
      >
        <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8 lg:mb-10">
          <div className={`p-4 sm:p-5 lg:p-6 rounded-full bg-gray-800 ${getStatusColor(orderData.currentStatus)}`}>
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
              {getStatusIcon(orderData.currentStatus)}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white capitalize text-base sm:text-lg lg:text-xl xl:text-2xl mb-1 sm:mb-2">
              {orderData.currentStatus.replace('_', ' ')}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              {orderData.statusHistory[orderData.statusHistory.length - 1]?.description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4 lg:h-5 mb-6 sm:mb-8 lg:mb-10">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 sm:h-4 lg:h-5 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: orderData.currentStatus === 'preparing' ? '25%' : 
                     orderData.currentStatus === 'ready' ? '50%' :
                     orderData.currentStatus === 'out_for_delivery' ? '75%' : '100%'
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Status Timeline */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {orderData.statusHistory.map((status, index) => (
            <motion.div 
              key={status.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-4 sm:space-x-6"
            >
              <div className={`p-3 sm:p-4 lg:p-5 rounded-full ${
                index < orderData.statusHistory.length - 1 ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-base sm:text-lg lg:text-xl font-medium capitalize mb-1">
                  {status.status.replace('_', ' ')}
                </p>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                  {new Date(status.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Driver Information */}
      {orderData.driver && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 lg:mb-16"
        >
          <h3 className="font-semibold text-white mb-6 sm:mb-8 lg:mb-10 flex items-center space-x-3 text-base sm:text-lg lg:text-xl xl:text-2xl">
            <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            <span>Your Driver</span>
          </h3>
          
          <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8 lg:mb-10">
            <img 
              src={orderData.driver.photo} 
              alt={orderData.driver.name}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-white text-base sm:text-lg lg:text-xl xl:text-2xl mb-2">{orderData.driver.name}</h4>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-yellow-400 fill-current" />
                <span className="text-gray-400 text-sm sm:text-base lg:text-lg">{orderData.driver.rating}</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg">{orderData.driver.vehicle}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-10 rounded-xl font-medium transition-colors flex items-center justify-center space-x-3 text-base sm:text-lg lg:text-xl">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              <span>Call Driver</span>
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-10 rounded-xl font-medium transition-colors flex items-center justify-center space-x-3 text-base sm:text-lg lg:text-xl">
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              <span>Track Live</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Order Details */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 lg:mb-16"
      >
        <h3 className="font-semibold text-white mb-6 sm:mb-8 lg:mb-10 flex items-center space-x-3 text-base sm:text-lg lg:text-xl xl:text-2xl">
          <Package className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
          <span>Order Details</span>
        </h3>
        
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 mb-6 sm:mb-8 lg:mb-10">
          {orderData.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-white font-medium text-base sm:text-lg lg:text-xl xl:text-2xl mb-1">{item.name}</p>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Qty: {item.quantity}</p>
              </div>
              <p className="text-white font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4 sm:pt-6 lg:pt-8">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl">Total</span>
            <span className="text-white font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl">${orderData.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Delivery Address */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 lg:mb-16"
      >
        <h3 className="font-semibold text-white mb-6 sm:mb-8 lg:mb-10 flex items-center space-x-3 text-base sm:text-lg lg:text-xl xl:text-2xl">
          <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
          <span>Delivery Address</span>
        </h3>
        
        <p className="text-gray-300 mb-4 sm:mb-6 lg:mb-8 text-base sm:text-lg lg:text-xl xl:text-2xl">{orderData.deliveryAddress}</p>
        
        {orderData.specialInstructions && (
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8">
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">Special Instructions:</p>
            <p className="text-white text-sm sm:text-base lg:text-lg xl:text-xl">{orderData.specialInstructions}</p>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl py-8 sm:py-12 lg:py-16"
      >
        <p className="mb-2 sm:mb-3 lg:mb-4">Need help? Contact us at support@mealprep.com</p>
        <p>Tracking #: {orderData.trackingNumber}</p>
      </motion.div>
    </div>
  );
};

export default OrderTracking;
