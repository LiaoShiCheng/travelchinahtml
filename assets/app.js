/**
 * TravelChina.com Front-End Client Application Script
 */

// Mobile Submenu Accordion Toggle
window.toggleMobileSubmenu = function(subId, btn) {
  const el = document.getElementById(subId);
  if (!el) return;
  el.classList.toggle('hidden');
  const icon = btn ? btn.querySelector('svg, i') : null;
  if (icon) {
    icon.classList.toggle('rotate-180');
  }
};

function initFrontApp() {
  // 1. Mobile Drawer Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // 2. Day-by-Day Accordion Itinerary Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      if (body) {
        body.classList.toggle('hidden');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      }
    });
  });

  const toggleAllBtn = document.getElementById('toggleAllAccordionBtn');
  if (toggleAllBtn) {
    let allExpanded = false;
    toggleAllBtn.addEventListener('click', () => {
      allExpanded = !allExpanded;
      document.querySelectorAll('.accordion-body').forEach(b => {
        if (allExpanded) {
          b.classList.remove('hidden');
        } else {
          b.classList.add('hidden');
        }
      });
      document.querySelectorAll('.accordion-icon').forEach(icon => {
        if (allExpanded) {
          icon.classList.add('rotate-180');
        } else {
          icon.classList.remove('rotate-180');
        }
      });
      toggleAllBtn.textContent = allExpanded ? 'Collapse All Days' : 'Expand All Days';
    });
  }

  // 3. 5-Tier Pricing Selector with Sidebar & Mobile Bar synchronization
  const tierCards = document.querySelectorAll('.tier-card');
  const sidebarDisplayPrice = document.getElementById('sidebarDisplayPrice');
  const mobileDisplayPrice = document.getElementById('mobileDisplayPrice');
  const inquiryTierPrice = document.getElementById('inquiryTierPrice');

  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => {
        c.classList.remove('border-china-red', 'bg-red-50/50');
        c.classList.add('border-gray-200');
      });
      card.classList.remove('border-gray-200');
      card.classList.add('border-china-red', 'bg-red-50/50');

      const price = card.getAttribute('data-price');
      const pax = card.getAttribute('data-pax');
      if (sidebarDisplayPrice) {
        sidebarDisplayPrice.textContent = '$' + price;
      }
      if (mobileDisplayPrice) {
        mobileDisplayPrice.textContent = '$' + price;
      }
      if (inquiryTierPrice) {
        inquiryTierPrice.value = price;
      }
    });
  });

  // 4. Hot Long-haul Tours Theme Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tourCards = document.querySelectorAll('.tour-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-china-red', 'text-white', 'active');
        b.classList.add('bg-gray-100', 'text-gray-700');
      });
      btn.classList.add('bg-china-red', 'text-white', 'active');
      btn.classList.remove('bg-gray-100', 'text-gray-700');

      const selectedTheme = btn.getAttribute('data-theme');
      tourCards.forEach(card => {
        const theme = card.getAttribute('data-theme');
        if (selectedTheme === 'all' || theme === selectedTheme) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. City Six Elements Tab Switcher
  const elemTabs = document.querySelectorAll('.city-elem-tab');
  elemTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      elemTabs.forEach(t => {
        t.classList.remove('bg-china-red', 'text-white', 'active');
        t.classList.add('bg-gray-100', 'text-gray-700');
      });
      tab.classList.add('bg-china-red', 'text-white', 'active');
      tab.classList.remove('bg-gray-100', 'text-gray-700');

      const targetId = tab.getAttribute('data-target');
      document.querySelectorAll('.elem-tab-content').forEach(c => {
        if (c.id === targetId) {
          c.classList.remove('hidden');
        } else {
          c.classList.add('hidden');
        }
      });
    });
  });

  // 6. Custom Tour Interactive DIY Builder with Group Size Multiplier
  const diyCheckboxes = document.querySelectorAll('.diy-checkbox');
  const selectedList = document.getElementById('selectedModulesList');
  const diyTotalPriceEl = document.getElementById('diyTotalPrice');
  const customGroupSize = document.getElementById('customGroupSize');

  function updateDiySummary() {
    if (!selectedList || !diyTotalPriceEl) return;
    const checked = Array.from(diyCheckboxes).filter(cb => cb.checked);
    if (checked.length === 0) {
      selectedList.innerHTML = '<p class="text-center py-4 text-gray-400">No items selected yet. Check boxes on the left to add day tours to your route.</p>';
      diyTotalPriceEl.textContent = '$0';
      return;
    }

    let paxMultiplier = 2;
    if (customGroupSize) {
      const val = customGroupSize.value;
      if (val === '1') paxMultiplier = 1;
      else if (val === '2') paxMultiplier = 2;
      else if (val === '3-4') paxMultiplier = 3.5;
      else if (val === '5-8') paxMultiplier = 6;
      else if (val === '9+') paxMultiplier = 10;
    }

    let total = 0;
    let html = '<ul class="space-y-2">';
    checked.forEach(cb => {
      const name = cb.getAttribute('data-name');
      const unitPrice = parseFloat(cb.getAttribute('data-price') || '0');
      const itemTotal = unitPrice * paxMultiplier;
      total += itemTotal;
      html += '<li class="flex items-center justify-between text-xs py-1 border-b border-gray-100"><span class="font-medium text-china-navy truncate pr-2">' + name + '</span><strong class="text-china-red shrink-0">$' + itemTotal.toFixed(0) + '</strong></li>';
    });
    html += '</ul>';
    selectedList.innerHTML = html;
    diyTotalPriceEl.textContent = '$' + Math.round(total);
  }

  diyCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateDiySummary);
  });
  if (customGroupSize) {
    customGroupSize.addEventListener('change', updateDiySummary);
  }

  // 7. Booking & Inquiry Modal Popups
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const openInquiryBtns = document.querySelectorAll('.open-inquiry-btn');
  const modalTourTitle = document.getElementById('modalTourTitle');
  const inquiryTourId = document.getElementById('inquiryTourId');
  const inquiryTourTitle = document.getElementById('inquiryTourTitle');

  openInquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourId = btn.getAttribute('data-tour-id') || '';
      const tourTitle = btn.getAttribute('data-tour-title') || 'General China Travel Inquiry';
      const price = btn.getAttribute('data-price') || '';

      if (modalTourTitle) modalTourTitle.textContent = tourTitle;
      if (inquiryTourId) inquiryTourId.value = tourId;
      if (inquiryTourTitle) inquiryTourTitle.value = tourTitle;
      if (inquiryTierPrice) inquiryTierPrice.value = price;
      if (bookingModal) bookingModal.classList.remove('hidden'), bookingModal.classList.add('flex');
    });
  });

  if (closeBookingModal && bookingModal) {
    closeBookingModal.addEventListener('click', () => {
      bookingModal.classList.add('hidden');
      bookingModal.classList.remove('flex');
    });
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.add('hidden');
        bookingModal.classList.remove('flex');
      }
    });
  }

  // 8. Toast Notification Utility & Form Submissions (Live CloudBase PostgreSQL Integration)
  function showFrontToast(message, type = 'success') {
    let toastContainer = document.getElementById('tc_front_toast');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'tc_front_toast';
      toastContainer.style.cssText = 'position: fixed; top: 24px; right: 24px; z-index: 999999; display: flex; flex-direction: column; gap: 10px; pointer-events: none; max-width: 90vw;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.style.cssText = 'pointer-events: auto; padding: 14px 22px; border-radius: 18px; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.25); transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); transform: translateY(-20px); opacity: 0;' + (isSuccess ? 'background: #0F1E36; color: #FFFFFF; border: 1.5px solid #C5A059;' : 'background: #DC2626; color: #FFFFFF; border: 1.5px solid #FFFFFF;');
    toast.innerHTML = '<span>' + (isSuccess ? '🎉' : '⚠️') + '</span> <span>' + message + '</span>';
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(-20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 350);
    }, 5000);
  }

  const pageInitTime = Date.now();

  const quickInquiryForm = document.getElementById('quickInquiryForm');
  const inquiryFeedback = document.getElementById('inquiryFeedback');
  if (quickInquiryForm) {
    quickInquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitInquiryBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin inline mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Submitting to Concierge...';
      }

      const formData = new FormData(quickInquiryForm);
      const rawData = Object.fromEntries(formData.entries());

      const payload = {
        id: 'inq-' + Date.now(),
        fullName: rawData.fullName || '',
        email: rawData.email || '',
        whatsapp: rawData.whatsapp || '',
        groupSize: rawData.groupSize || '2 Persons',
        travelDate: rawData.travelDate || '',
        hotelCategory: rawData.hotelCategory || '5-star-luxury',
        totalPrice: parseFloat(rawData.tierPrice || 0) || 0,
        notes: (rawData.tourTitle ? ('[Tour: ' + rawData.tourTitle + ' (ID: ' + (rawData.tourId || 'N/A') + ')] ') : '') + (rawData.notes || ''),
        status: '待制定方案',
        hp_website_trap: rawData.hp_website_trap || '',
        form_rendered_at: pageInitTime
      };

      try {
        const response = await fetch('https://travelchina-d1gj8y48be5df37fd-1321205937.ap-singapore.app.tcloudbase.com/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const res = await response.json();

        if (res && res.code === 429) {
          showFrontToast(res.message || 'Too many submissions. Please contact us directly.', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Inquiry / Lock Today\'s Rate</span>';
          }
          return;
        }

        showFrontToast('✓ Inquiry Received! A travel designer will email your proposal within 12 hours.', 'success');

        if (inquiryFeedback) {
          inquiryFeedback.className = 'text-xs text-center font-bold text-emerald-700 mt-3 block bg-emerald-50 p-3 rounded-2xl border border-emerald-200 shadow-sm';
          inquiryFeedback.innerHTML = '🎉 <strong>Inquiry Received!</strong> Our travel specialist will prepare your custom proposal and contact you at <u>' + (rawData.email || 'your email') + '</u> within 12 hours.';
          inquiryFeedback.classList.remove('hidden');
        }

        if (submitBtn) {
          submitBtn.innerHTML = '<span class="text-white font-bold">✓ Request Submitted Successfully!</span>';
        }

        quickInquiryForm.reset();
        setTimeout(() => {
          if (bookingModal) {
            bookingModal.classList.add('hidden');
            bookingModal.classList.remove('flex');
          }
          if (inquiryFeedback) inquiryFeedback.classList.add('hidden');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Inquiry / Lock Today\'s Rate</span>';
          }
        }, 3500);
      } catch (err) {
        showFrontToast('Submission error. Please email us directly.', 'error');
        if (inquiryFeedback) {
          inquiryFeedback.className = 'text-xs text-center font-bold text-red-600 mt-3 block bg-red-50 p-3 rounded-2xl border border-red-200';
          inquiryFeedback.textContent = 'Submission error. Please email us directly at ' + 'service@travelchina.com';
          inquiryFeedback.classList.remove('hidden');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Inquiry / Lock Today\'s Rate</span>';
        }
      }
    });
  }

  const customTourForm = document.getElementById('customTourForm');
  const customFormFeedback = document.getElementById('customFormFeedback');
  if (customTourForm) {
    customTourForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitCustomFormBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin inline mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Designing Custom Proposal...';
      }

      const formData = new FormData(customTourForm);
      const rawData = Object.fromEntries(formData.entries());

      let dayTourState = {
        city: 'Beijing',
        citySlug: 'beijing',
        pax: 2,
        attractions: [],
        restaurants: [],
        vehicle: '',
        guide: '',
        estimatedPriceRange: '$0'
      };

      if (typeof window.getDayTourBuilderState === 'function') {
        dayTourState = window.getDayTourBuilderState();
      }

      const noteLines = [
        '[Custom 1-Day Tour Itinerary Request]',
        '• Destination City: ' + dayTourState.city,
        '• Party Size: ' + dayTourState.pax + ' Travelers',
        '• Selected Landmarks (' + dayTourState.attractions.length + '): ' + (dayTourState.attractions.join(', ') || 'None'),
        '• Dining Preferences: ' + (dayTourState.restaurants.join(', ') || 'Local recommendations on the day'),
        '• Private Vehicle: ' + (dayTourState.vehicle || 'Included'),
        '• Private Guide: ' + (dayTourState.guide || 'Included'),
        '• Live Quoted Range: ' + dayTourState.estimatedPriceRange
      ];
      if (rawData.notes) {
        noteLines.push('Client Notes: ' + rawData.notes);
      }
      const mergedNotes = noteLines.join(String.fromCharCode(10));

      const numericPriceMatch = (dayTourState.estimatedPriceRange || '').match(/$([0-9]+)/);
      const approxPrice = numericPriceMatch ? parseFloat(numericPriceMatch[1]) : 0;

      const payload = {
        id: 'inq-' + Date.now(),
        fullName: rawData.fullName || '',
        email: rawData.email || '',
        whatsapp: rawData.whatsapp || '',
        groupSize: dayTourState.pax + ' Persons',
        travelDate: rawData.travelDate || '',
        hotelCategory: 'day-tour',
        totalPrice: approxPrice,
        notes: mergedNotes,
        selectedModules: {
          type: 'custom_day_tour',
          city: dayTourState.city,
          citySlug: dayTourState.citySlug,
          pax: dayTourState.pax,
          attractions: dayTourState.attractions,
          restaurants: dayTourState.restaurants,
          vehicle: dayTourState.vehicle,
          guide: dayTourState.guide,
          quotedRange: dayTourState.estimatedPriceRange
        },
        status: '待制定方案',
        hp_website_trap: rawData.hp_website_trap || '',
        form_rendered_at: pageInitTime
      };

      try {
        const response = await fetch('https://travelchina-d1gj8y48be5df37fd-1321205937.ap-singapore.app.tcloudbase.com/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const res = await response.json();

        if (res && res.code === 429) {
          showFrontToast(res.message || 'Too many submissions. Please contact us directly.', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Custom Proposal Request</span>';
          }
          return;
        }

        showFrontToast('✓ Custom itinerary request received! A travel designer will send your proposal shortly.', 'success');

        if (customFormFeedback) {
          customFormFeedback.className = 'text-xs text-center font-bold text-emerald-700 mt-3 block bg-emerald-50 p-3 rounded-2xl border border-emerald-200 shadow-sm';
          customFormFeedback.innerHTML = '🎉 <strong>Custom Proposal Request Received!</strong> Our travel specialist will design your route and email you at <u>' + (rawData.email || 'your email') + '</u> within 12 hours.';
          customFormFeedback.classList.remove('hidden');
        }

        if (submitBtn) {
          submitBtn.innerHTML = '<span class="text-white font-bold">✓ Proposal Request Sent!</span>';
        }

        customTourForm.reset();
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Custom Proposal Request</span> <i data-lucide="send" class="w-4 h-4 inline ml-1"></i>';
            if (window.lucide) lucide.createIcons();
          }
        }, 4000);
      } catch (err) {
        showFrontToast('Submission error. Please contact us via WhatsApp.', 'error');
        if (customFormFeedback) {
          customFormFeedback.className = 'text-xs text-center font-bold text-red-600 mt-3 block bg-red-50 p-3 rounded-2xl border border-red-200';
          customFormFeedback.textContent = 'Submission error. Please contact us via WhatsApp.';
          customFormFeedback.classList.remove('hidden');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Custom Proposal Request</span> <i data-lucide="send" class="w-4 h-4 inline ml-1"></i>';
          if (window.lucide) lucide.createIcons();
        }
      }
    });
  }

  // 9. Initialize Leaflet Route Map if on Tour Detail page
  const mapContainer = document.getElementById('tourLeafletMap');
  if (mapContainer && typeof L !== 'undefined') {
    try {
      const waypointsRaw = mapContainer.getAttribute('data-waypoints');
      const waypoints = JSON.parse(waypointsRaw || '[]');
      if (waypoints.length > 0) {
        const first = waypoints[0];
        const map = L.map('tourLeafletMap').setView([first.lat, first.lng], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const latlngs = [];
        waypoints.forEach(wp => {
          const latlng = [wp.lat, wp.lng];
          latlngs.push(latlng);
          L.marker(latlng).addTo(map).bindPopup('<b>' + wp.city + '</b><br/>' + wp.day);
        });

        if (latlngs.length > 1) {
          const polyline = L.polyline(latlngs, { color: '#C8102E', weight: 4, opacity: 0.8, dashArray: '8, 8' }).addTo(map);
          map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
        }
      }
    } catch (e) {
      console.warn('Map initialization:', e);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFrontApp);
} else {
  initFrontApp();
}
