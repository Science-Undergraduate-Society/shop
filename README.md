# 🛍️ shop.susubc.ca  
 
Welcome to the **SUS UBC Online Shop**!  
This site is where students can browse and purchase official SUS merchandise like hoodies, crewnecks, jackets, patches, and more.  

--- 
  
# Pickup Management

A) Purchase Tracking & Email Notifications
 
Square provides automatic email notifications:

Order Confirmation Emails - Sent automatically when purchase is made
Order Status Updates - Sent when order status changes
Pickup Ready Notifications - Sent when order is ready
For developers, Square offers:

Webhooks API - Get real-time notifications when orders are created/updated:

order.created - Triggered when an order is created
order.updated - Triggered when order status changes
order.fulfillment.updated - Triggered when fulfillment status changes


B) Pickup Management

Square Dashboard includes:

Order Manager - View all pickup orders in one place
Order Status Tracking - Mark orders as:
Received
In Progress
Ready for Pickup
Completed
Customer Notifications - Automatic SMS/email when order is ready
Pickup Scheduling - Customers can select pickup time windows

# Store Status

This section explains how the temporary store pause works.

## Current Behavior

- Store purchasing is controlled by `FORCE_STORE_PAUSE` in `src/lib/storeStatus.ts`.
- `TRANSITION_PERIOD_LABEL` is set to `Summer 2026` and is used for customer-facing messaging.

## What Happens When Paused

When `FORCE_STORE_PAUSE` is `true`:

- Product buy button is disabled and shown as "Temporarily Closed".
- A notice appears under the buy button explaining purchases are paused.
- The site-wide notice is replaced with the transition message.
- Product browsing remains available.

## How To Toggle

1. Open `src/lib/storeStatus.ts`.
2. Set `FORCE_STORE_PAUSE` to:
- `true` to pause purchases.
- `false` to allow purchases.

## Related Files

- `src/lib/storeStatus.ts`
- `src/components/Notice/Notice.tsx`
- `src/components/ProductDetails/ProductDetails.tsx`

