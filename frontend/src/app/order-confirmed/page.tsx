"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./orderConfirmed.module.css";
import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";

export default function OrderConfirmedPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order") || searchParams.get("orderId");
    const email = searchParams.get("email");
    
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    // Generate available pickup dates (next 7 days, weekdays only)
    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            dates.push({
            value: date.toISOString().split('T')[0],
            label: date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            })
            });
        }
        }
        return dates;
    };

    // Available pickup times
    const availableTimes = [
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM"
    ];

    const handleVerification = () => {
        // Simple verification - in production, you'd verify against Square order
        if (verificationCode.length >= 4) {
        setIsVerified(true);
        }
    };

    const handleBooking = () => {
        if (selectedDate && selectedTime) {
        // Here you would send the booking info to your backend/database
        // For now, we'll just confirm it
        setBookingConfirmed(true);
        
        // Optional: Send email confirmation
        console.log({
            orderId,
            email,
            pickupDate: selectedDate,
            pickupTime: selectedTime
        });
        }
    };

    if (!orderId) {
        return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <div className={styles.container}>
            <div className={styles.errorBox}>
                <h1>⚠️ No Order Found</h1>
                <p>Please complete your purchase first.</p>
                <Link href="/">
                <button className={styles.button}>Back to Shop</button>
                </Link>
            </div>
            </div>
            <Footer />
        </div>
        );
    }

    if (!isVerified) {
        return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <div className={styles.container}>
            <div className={styles.verificationBox}>
                <h1>✅ Payment Successful!</h1>
                <p className={styles.orderInfo}>Order ID: {orderId}</p>
                
                <div className={styles.verificationSection}>
                <h2>Verify Your Order</h2>
                <p>Please enter the last 4 digits of your order confirmation or email:</p>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                />
                <button 
                    className={styles.button}
                    onClick={handleVerification}
                    disabled={verificationCode.length < 4}
                >
                    Verify & Continue
                </button>
                <p className={styles.helperText}>
                    Check your email confirmation for the verification code.
                </p>
                </div>
            </div>
            </div>
            <Footer />
        </div>
        );
    }

    if (bookingConfirmed) {
        return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <div className={styles.container}>
            <div className={styles.confirmationBox}>
                <div className={styles.successIcon}>🎉</div>
                <h1>Pickup Scheduled!</h1>
                <div className={styles.bookingDetails}>
                <h2>Your Pickup Details:</h2>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Order ID:</span>
                    <span className={styles.value}>{orderId}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Date:</span>
                    <span className={styles.value}>
                    {getAvailableDates().find(d => d.value === selectedDate)?.label}
                    </span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Time:</span>
                    <span className={styles.value}>{selectedTime}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Location:</span>
                    <span className={styles.value}>
                    SUS Office, AMS Nest Building<br/>
                    2nd Floor, UBC Vancouver
                    </span>
                </div>
                </div>
                
                <div className={styles.reminderBox}>
                <h3>📧 Confirmation Sent</h3>
                <p>We've sent your pickup details to {email || 'your email'}</p>
                <p className={styles.note}>Please bring your confirmation email and student ID</p>
                </div>

                <Link href="/">
                <button className={styles.button}>Back to Shop</button>
                </Link>
            </div>
            </div>
            <Footer />
        </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.bookingBox}>
            <h1>✅ Order Confirmed!</h1>
            <p className={styles.orderInfo}>Order ID: {orderId}</p>
            
            <div className={styles.pickupSection}>
                <h2>Schedule Your Pickup</h2>
                <p className={styles.subtitle}>Choose a convenient time to pick up your order</p>

                <div className={styles.formGroup}>
                <label>Pickup Date:</label>
                <select
                    className={styles.select}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="">Select a date...</option>
                    {getAvailableDates().map((date) => (
                    <option key={date.value} value={date.value}>
                        {date.label}
                    </option>
                    ))}
                </select>
                </div>

                <div className={styles.formGroup}>
                <label>Pickup Time:</label>
                <select
                    className={styles.select}
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={!selectedDate}
                >
                    <option value="">Select a time...</option>
                    {availableTimes.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
                </div>

                <div className={styles.locationInfo}>
                <h3>📍 Pickup Location</h3>
                <p><strong>SUS Office</strong></p>
                <p>AMS Nest Building, 2nd Floor</p>
                <p>6133 University Blvd, Vancouver, BC</p>
                <p className={styles.hours}>Hours: Monday-Friday, 11am-3pm</p>
                </div>

                <button
                className={styles.button}
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                >
                Confirm Pickup Time
                </button>
            </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}
