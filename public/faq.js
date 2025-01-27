/**
 * @author Alicia Zhang
 * CS132 Spring 2024
 * Attempt at connecting to API in .json file for FAQ data. Buggy code 
 * without proper middleware implementation. 
 */

(function() {
    "use strict";
    const BASE_URL = "/";
    window.addEventListener('load', init);

    function init() {
      fetchFAQs();
    }
    
    async function fetchFAQs() {
        let url = BASE_URL + "faq"
        try {
        let resp = await fetch(url);
        resp = checkStatus(resp);
 
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch FAQs');
        }
        
        displayFAQs(data.faqs);
        } catch (err) {
        showError(err.message);
        }
    }

    function displayFAQs(faqs) {
        const faqList = id('faq-list');
        faqList.innerHTML = ''; 

        if (!faqs || faqs.length === 0) {
        faqList.innerHTML = '<p class="no-faqs">No FAQs available at this time.</p>';
        return;
        }

        faqs.forEach(faq => {
        const faqItem = gen('div');
        faqItem.className = 'faq-item';
        
        const question = gen('div');
        question.className = 'faq-question';
        question.textContent = faq.question;
        
        const answer = gen('div');
        answer.className = 'faq-answer';
        answer.textContent = faq.answer;
        
        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqList.appendChild(faqItem);
    });
  }

  function showError(message) {
    const errorDiv = id('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }

  /** Helper function to return the element with the specified id */
  function id(idName) {
    return document.getElementById(idName);
  }

  /** Helper function to create a new element of given type */
  function gen(tagName) {
    return document.createElement(tagName);
  }
}); 