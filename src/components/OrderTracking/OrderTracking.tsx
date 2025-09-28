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
import './OrderTracking.css';

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

    const getStatusColorClass = (status: string) => {
        switch (status) {
            case 'preparing':
                return 'preparing';
            case 'ready':
                return 'ready';
            case 'out_for_delivery':
                return 'out_for_delivery';
            case 'delivered':
                return 'delivered';
            default:
                return 'default';
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
        <div className="main-order-tracking">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="header-section"
            >
                <h1 className="header-title">Track Your Order</h1>
                <p className="header-subtitle">Order #{orderData.orderId}</p>
            </motion.div>


            {/* Delivery Window Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="delivery-window-card"
            >
                <div className="delivery-header">
                    <div className="delivery-clock-section">
                        <Clock className="delivery-clock-icon" />
                        <span className="delivery-window-label">Delivery Window</span>
                    </div>
                    <div className="delivery-time-section">
                        <div className="delivery-time-main">{timeUntilDelivery}</div>
                        <div className="delivery-time-sub">until estimated arrival</div>
                    </div>
                </div>

                <div className="delivery-window-center">
                    <div className="delivery-window-time">
                        {formatTime(orderData.deliveryWindow.start)} - {formatTime(orderData.deliveryWindow.end)}
                    </div>
                    <div className="delivery-expected">Expected: {formatTime(orderData.estimatedDelivery)}</div>
                </div>
            </motion.div>

            {/* Current Status */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="status-card"
            >
                <div className="status-header">
                    <div className="status-icon-container">
                        <div className={`status-icon ${getStatusColorClass(orderData.currentStatus)}`}>
                            {getStatusIcon(orderData.currentStatus)}
                        </div>
                    </div>
                    <div className="status-content">
                        <h3 className="status-title">
                            {orderData.currentStatus.replace(/_/g, ' ')}
                        </h3>
                        <p className="status-description">
                            {orderData.statusHistory[orderData.statusHistory.length - 1]?.description}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <motion.div
                        className="progress-bar"
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
                <div className="status-timeline">
                    {orderData.statusHistory.map((status, index) => (
                        <motion.div
                            key={status.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="timeline-item"
                        >
                            <div className={`timeline-icon-container ${index < orderData.statusHistory.length - 1 ? 'completed' : 'current'}`}>
                                <CheckCircle className="timeline-icon" />
                            </div>

                            <div className="timeline-content">
                                <p className="timeline-status">
                                    {status.status.replace(/_/g, ' ')}
                                </p>
                                <p className="timeline-time">
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
                    className="driver-card"
                >
                    <h3 className="driver-title">
                        <User className="driver-title-icon" />
                        <span>Your Driver</span>
                    </h3>

                    <div className="driver-info">
                        <img
                            src={orderData.driver.photo}
                            alt={orderData.driver.name}
                            className="driver-photo"
                        />
                        <div className="driver-details">
                            <h4 className="driver-name">{orderData.driver.name}</h4>
                            <div className="driver-rating">
                                <Star className="driver-star" />
                                <span className="driver-rating-text">{orderData.driver.rating}</span>
                            </div>
                            <p className="driver-vehicle">{orderData.driver.vehicle}</p>
                        </div>
                    </div>

                    <div className="driver-actions">
                        <button className="driver-button">
                            <Phone className="driver-button-icon" />
                            <span>Call Driver</span>
                        </button>
                        <button className="driver-button secondary">
                            <Navigation className="driver-button-icon" />
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
                className="order-details-card"
            >
                <h3 className="order-details-title">
                    <Package className="order-details-icon" />
                    <span>Order Details</span>
                </h3>

                <div className="order-items">
                    {orderData.items.map((item) => (
                        <div key={item.id} className="order-item">
                            <div className="order-item-details">
                                <p className="order-item-name">{item.name}</p>
                                <p className="order-item-quantity">Qty: {item.quantity}</p>
                            </div>
                            <p className="order-item-price">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="order-total-section">
                    <div className="order-total">
                        <span className="order-total-label">Total</span>
                        <span className="order-total-amount">${orderData.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </motion.div>

            {/* Delivery Address */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="delivery-address-card"
            >
                <h3 className="delivery-address-title">
                    <MapPin className="delivery-address-icon" />
                    <span>Delivery Address</span>
                </h3>

                <p className="delivery-address-text">{orderData.deliveryAddress}</p>

                {orderData.specialInstructions && (
                    <div className="special-instructions">
                        <p className="special-instructions-label">Special Instructions:</p>
                        <p className="special-instructions-text">{orderData.specialInstructions}</p>
                    </div>
                )}
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="footer-section"
            >
                <p className="footer-text">Need help? Contact us at support@mealprep.com</p>
                <p>Tracking #: {orderData.trackingNumber}</p>
            </motion.div>
        </div>
    );
};

export default OrderTracking;
