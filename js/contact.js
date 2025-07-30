document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('facebook-message-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!message) {
                alert('Please write a message.');
                return;
            }

            // Create a pre-filled message
            const fullMessage = `Hi, my name is ${name}. \n\nMessage: ${message}`;
            
            // Your Facebook Page username
            const facebookPageUsername = 'sylflora.official';

            // Create the Facebook Messenger URL
            // The 'ref' parameter can be used to pass a pre-filled message, but it has limitations.
            // A more direct way is to link to the messages page. For a better user experience,
            // we will just open the chat window. The user can then paste their message.
            // However, we'll construct a direct message link for platforms that support it.
            const messageText = encodeURIComponent(`From Website: ${message}`);
            const messengerUrl = `https://www.facebook.com/messages/t/${facebookPageUsername}`;

            // We can also try the m.me link which is shorter
            // const messengerUrl = `https://m.me/${facebookPageUsername}?text=${messageText}`;


            // Let's inform the user what to do, as we can't reliably pre-fill the message on all devices.
            alert(`We will now open Facebook Messenger. Please send your message there.`);
            
            window.open(messengerUrl, '_blank');
        });
    }
});