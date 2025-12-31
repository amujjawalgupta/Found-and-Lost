
        // Mock Data for Found Items
        const foundItems = [
            {
                id: 1,
                title: "Apple AirPods Pro",
                category: "electronics",
                location: "Science Hall Labs",
                date: "Today, 10:30 AM",
                color: "White",
                image: "https://placehold.co/400x300/F1F5F9/1E3A8A?text=AirPods",
                icon: "fa-headphones"
            },
            {
                id: 2,
                title: "Hydroflask Bottle",
                category: "accessories",
                location: "Main Gym",
                date: "Yesterday",
                color: "Navy Blue",
                image: "https://placehold.co/400x300/1E3A8A/FFFFFF?text=Bottle",
                icon: "fa-bottle-water"
            },
            {
                id: 3,
                title: "Calculus Textbook",
                category: "books",
                location: "Library 3rd Floor",
                date: "2 days ago",
                color: "Green/White",
                image: "https://placehold.co/400x300/14B8A6/FFFFFF?text=Textbook",
                icon: "fa-book"
            },
            {
                id: 4,
                title: "Denim Jacket",
                category: "clothing",
                location: "Student Union",
                date: "3 days ago",
                color: "Blue",
                image: "https://placehold.co/400x300/3B82F6/FFFFFF?text=Jacket",
                icon: "fa-shirt"
            },
            {
                id: 5,
                title: "Honda Car Keys",
                category: "electronics",
                location: "Parking Lot B",
                date: "3 days ago",
                color: "Black",
                image: "https://placehold.co/400x300/0F172A/FFFFFF?text=Keys",
                icon: "fa-key"
            },
            {
                id: 6,
                title: "Student ID (Smith)",
                category: "accessories",
                location: "Cafeteria",
                date: "4 days ago",
                color: "N/A",
                image: "https://placehold.co/400x300/E2E8F0/1E3A8A?text=ID+Card",
                icon: "fa-id-card"
            }
        ];

        // Function to render items
        function renderItems(items) {
            const grid = document.getElementById('items-grid');
            const noResults = document.getElementById('no-results');
            
            grid.innerHTML = '';
            
            if (items.length === 0) {
                grid.classList.add('hidden');
                noResults.classList.remove('hidden');
                return;
            }
            
            grid.classList.remove('hidden');
            noResults.classList.add('hidden');

            items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = `item-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col fade-in`;
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <div class="relative h-48 bg-slate-100 group">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-brand-navy shadow-sm">
                            <i class="fa-solid ${item.icon} mr-1"></i> ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </div>
                    </div>
                    <div class="p-5 flex-1 flex flex-col">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-slate-800 text-lg leading-tight line-clamp-1">${item.title}</h3>
                        </div>
                        <div class="space-y-2 text-sm text-slate-500 mb-4">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-location-dot text-brand-teal w-4"></i> ${item.location}
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-clock text-brand-blue w-4"></i> ${item.date}
                            </div>
                        </div>
                        <div class="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                            <button onclick="claimItem('${item.title}')" class="flex-1 bg-brand-navy hover:bg-blue-800 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                                It's Mine!
                            </button>
                            <button class="px-3 py-2 text-brand-navy bg-brand-sky hover:bg-blue-200 rounded-lg transition-colors">
                                <i class="fa-solid fa-share-nodes"></i>
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Search and Filter Logic
        function filterItems() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const category = document.getElementById('category-filter').value;

            const filtered = foundItems.filter(item => {
                const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                                      item.location.toLowerCase().includes(searchTerm);
                const matchesCategory = category === 'all' || item.category === category;
                return matchesSearch && matchesCategory;
            });

            renderItems(filtered);
        }

        function quickSearch(term) {
            document.getElementById('search-input').value = term;
            filterItems();
            document.getElementById('found-items').scrollIntoView({ behavior: 'smooth' });
        }

        // Mobile Menu Toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Form Handling
        function handleReportSubmit(e) {
            e.preventDefault();
            
            // Show notification
            const notif = document.getElementById('notification');
            notif.classList.remove('translate-y-20', 'opacity-0');
            
            // Reset form
            e.target.reset();

            // Hide notification after 3s
            setTimeout(() => {
                notif.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // Mock Claim Action
        function claimItem(itemName) {
            alert(`To claim the ${itemName}, please visit the Student Center (Rm 102) with a valid Student ID.`);
        }

        // Mock Load More
        function loadMore() {
            const btn = event.target;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Loading...';
            setTimeout(() => {
                btn.innerHTML = 'No more items to display';
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
            }, 800);
        }

        // Initial Render
        document.addEventListener('DOMContentLoaded', () => {
            renderItems(foundItems);
        });

