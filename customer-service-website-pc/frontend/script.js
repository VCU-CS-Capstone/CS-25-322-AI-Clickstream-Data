document.addEventListener('DOMContentLoaded', () => {
    // Fetch FAQs from the backend
    fetch('http://localhost:5001/faqs')
        .then(response => response.json())
        .then(data => {
            const faqList = document.getElementById('faq-list');
            data.forEach(faq => {
                const div = document.createElement('div');
                div.innerHTML = `<h3>${faq.question}</h3><p>${faq.answer}</p>`;
                faqList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching FAQs:', error));
});
