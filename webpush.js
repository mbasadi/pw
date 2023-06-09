const webpush = require('web-push');


// // VAPID keys should only be generated only once.
const vapidKeys = {
    publicKey: 'BEQCD1J49QR3V7_ryGogZ__5MEfXrY5Uy89wr2ojEKE6sAONKpduQQztkZBnBfhX8nCRxf6CHSq5V_KSd7MiYwA',
    privateKey: 'lWogMwdUmsLhT4Y65hkvBgd6jPYyP8H6kxmbFBjm0JI'
  }

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
  endpoint: '.....',
  keys: {
    auth: '.....',
    p256dh: '.....'
  }
};

webpush.sendNotification(pushSubscription, 'Your Push Payload Text');