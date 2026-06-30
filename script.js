// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://depusykhamkgeluagtss.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcHVzeWtoYW1rZ2VsdWFndHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MTQ2MjYsImV4cCI6MjA5ODM5MDYyNn0.GBN_HR5pAHWGvZbTb0m00rN-brzrI_Wao0Sm6RxERN4';

// Initialize Supabase client
let currentUser = null;

// Check if Supabase is loaded
if (typeof window.supabase !== 'undefined') {
    try {
        const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Check for existing session
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            currentUser = session?.user || null;
            updateUIForAuth();
        });
        
        // Listen for auth changes
        supabaseClient.auth.onAuthStateChange((event, session) => {
            currentUser = session?.user || null;
            updateUIForAuth();
        });
        
        // Store client globally for use throughout the app
        window.supabaseClient = supabaseClient;
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
    }
} else {
    console.warn('Supabase client not loaded');
}

// Generic icon placeholder (no hardcoded SVGs)
function getGenericIcon() {
    return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#007acc"/>
        <text x="50" y="60" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">EXT</text>
    </svg>`;
}

// Fallback mock data (used when Supabase is not configured)
const mockExtensions = [
    {
        id: 'ms-python.python',
        name: 'Python',
        author: 'Microsoft',
        authorUrl: 'microsoft.com',
        description: 'Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more.',
        version: '2024.0.0',
        installs: 225295733,
        rating: 4.5,
        ratingCount: 630,
        price: 'Free',
        categories: ['Programming Languages', 'Debuggers', 'Data Science'],
        tags: ['debuggers', 'django', 'ini', 'jinja', 'json', 'keybindings', 'language-model-tools', 'linters', 'multi-root ready', 'piprequirements', 'pip-requirements', 'python', 'requirements.txt', 'toml', 'tools', 'unittest', 'yaml'],
        lastUpdated: '2024-01-15',
        icon: null
    },
    {
        id: 'ms-python.vscode-pylance',
        name: 'Pylance',
        author: 'Microsoft',
        authorUrl: 'microsoft.com',
        description: 'A performant, feature-rich language server for Python in VS Code, providing fast IntelliSense, type checking, and code navigation.',
        version: '2024.0.0',
        installs: 150000000,
        rating: 4.6,
        ratingCount: 450,
        price: 'Free',
        categories: ['Programming Languages'],
        tags: ['python', 'intellisense', 'type-checking', 'language-server'],
        lastUpdated: '2024-01-10',
        icon: null
    },
    {
        id: 'ms-python.debugpy',
        name: 'Python Debugger',
        author: 'Microsoft',
        authorUrl: 'microsoft.com',
        description: 'Debug Python code with breakpoints, call stacks, and an interactive console. Supports local and remote debugging.',
        version: '2024.0.0',
        installs: 120000000,
        rating: 4.5,
        ratingCount: 380,
        price: 'Free',
        categories: ['Debuggers'],
        tags: ['debuggers', 'python', 'debugging'],
        lastUpdated: '2024-01-08',
        icon: null
    },
    {
        id: 'ReSharper.csharp',
        name: 'C# by ReSharper',
        author: 'JetBrains',
        authorUrl: 'jetbrains.com',
        description: 'C# language support powered by ReSharper. Provides IntelliSense, code analysis, refactoring, and more.',
        version: '1.0.0',
        installs: 57700,
        rating: 4.7,
        ratingCount: 120,
        price: 'Free',
        categories: ['Programming Languages'],
        tags: ['csharp', 'resharper', 'intellisense'],
        lastUpdated: '2024-01-12',
        icon: null
    },
    {
        id: 'golang.go',
        name: 'Toolitude for Go',
        author: 'Tooltitude Team',
        authorUrl: 'tooltitude.com',
        description: 'Go language support with IntelliSense, debugging, and integrated tooling for Go development.',
        version: '0.30.0',
        installs: 30600,
        rating: 4.4,
        ratingCount: 85,
        price: 'Free',
        categories: ['Programming Languages'],
        tags: ['go', 'golang', 'debugging'],
        lastUpdated: '2024-01-05',
        icon: null
    },
    {
        id: 'aspire.aspire',
        name: 'Aspire',
        author: 'Microsoft',
        authorUrl: 'microsoft.com',
        description: 'Aspire helps you build resilient, observable, and configurable cloud-native applications with .NET.',
        version: '8.0.0',
        installs: 26900,
        rating: 4.6,
        ratingCount: 95,
        price: 'Free',
        categories: ['Programming Languages', 'Cloud'],
        tags: ['aspire', 'dotnet', 'cloud-native'],
        lastUpdated: '2024-01-14',
        icon: null
    },
    {
        id: 'shyylol.theme-switcher',
        name: 'Theme Switcher',
        author: 'shyylol',
        authorUrl: 'shyylol',
        description: 'Quickly switch between themes with a customizable keyboard shortcut. Supports light, dark, and custom themes.',
        version: '1.0.0',
        installs: 9100,
        rating: 4.3,
        ratingCount: 45,
        price: 'Free',
        categories: ['Themes'],
        tags: ['theme', 'customization', 'ui'],
        lastUpdated: '2023-12-20',
        icon: null
    },
    {
        id: 'RedCMD.json-embedded-lang',
        name: 'JSON Embedded Lang',
        author: 'RedCMD',
        authorUrl: 'RedCMD',
        description: 'Adds syntax highlighting for embedded languages in JSON files. Supports JSON with comments, JSONC, and more.',
        version: '1.2.0',
        installs: 1200,
        rating: 4.5,
        ratingCount: 30,
        price: 'Free',
        categories: ['Programming Languages'],
        tags: ['json', 'syntax-highlighting', 'embedded-languages'],
        lastUpdated: '2024-01-02',
        icon: null
    },
    {
        id: 'barisozgen.mesh-graph',
        name: 'Mesh Graph',
        author: 'Baris Ozgen',
        authorUrl: 'barisozgen',
        description: 'Visualize and explore mesh data structures with interactive 3D graphs. Perfect for computational geometry and mesh processing.',
        version: '1.0.0',
        installs: 1000,
        rating: 4.2,
        ratingCount: 15,
        price: 'Free',
        categories: ['Data Science', 'Visualization'],
        tags: ['mesh', '3d', 'visualization', 'graph'],
        lastUpdated: '2023-12-15',
        icon: null
    }
];

// Global extensions data
let extensionsData = [];
let selectedFile = null;

// Helper function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Helper function to generate star rating
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0L10 5.5H16L11 9L13 15L8 11.5L3 15L5 9L0 5.5H6L8 0Z"/></svg>`;
    }
    
    if (hasHalfStar) {
        starsHTML += `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0L10 5.5H16L11 9L13 15L8 11.5L3 15L5 9L0 5.5H6L8 0Z"/></svg>`;
    }
    
    return starsHTML;
}

// Create extension card HTML
function createExtensionCard(extension) {
    const iconSVG = extension.icon ? getGenericIcon() : getGenericIcon();
    
    return `
        <div class="extension-card" data-extension-id="${extension.id}">
            <div class="extension-icon">
                ${iconSVG}
            </div>
            <a href="#" class="extension-name" data-extension-id="${extension.id}">${extension.name}</a>
            <div class="extension-author">
                by <a href="#" onclick="event.stopPropagation()">${extension.author}</a>
            </div>
            <div class="extension-description">${extension.description}</div>
            <div class="extension-meta">
                <div class="extension-meta-item">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1L10 5.5H15L11 8.5L13 14L8 10.5L3 14L5 8.5L1 5.5H6L8 1Z"/>
                    </svg>
                    <div class="rating">
                        ${generateStarRating(extension.rating)}
                        <span class="rating-count">(${extension.ratingCount})</span>
                    </div>
                </div>
                <div class="extension-meta-item">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 2C5 2 3 4 3 7C3 10 8 14 8 14C8 14 13 10 13 7C13 4 11 2 8 2ZM8 9C6.9 9 6 8.1 6 7C6 5.9 6.9 5 8 5C9.1 5 10 5.9 10 7C10 8.1 9.1 9 8 9Z"/>
                    </svg>
                    <span>${formatNumber(extension.installs)}</span>
                </div>
                <div class="extension-price">${extension.price}</div>
            </div>
        </div>
    `;
}

// Render extensions
function renderExtensions() {
    const container = document.getElementById('extensionsGrid');
    
    if (extensionsData.length === 0) {
        container.innerHTML = '<p style="color: var(--foreground-secondary); text-align: center; padding: 40px;">No extensions found.</p>';
        return;
    }
    
    container.innerHTML = extensionsData.map(ext => createExtensionCard(ext)).join('');
    
    // Add click handlers to extension cards
    document.querySelectorAll('.extension-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const extensionId = card.dataset.extensionId;
            openExtensionModal(extensionId);
        });
    });
}

// Open extension modal
function openExtensionModal(extensionId) {
    const extension = extensionsData.find(ext => ext.id === extensionId);
    if (!extension) return;
    
    const modal = document.getElementById('extensionModal');
    const modalBody = document.getElementById('modalBody');
    const iconSVG = getGenericIcon();
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">
                ${iconSVG}
            </div>
            <div class="modal-title-section">
                <h1 class="modal-title">${extension.name}</h1>
                <div class="modal-author">
                    by <a href="#">${extension.author}</a>
                </div>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <span>${formatNumber(extension.installs)} installs</span>
                    </div>
                    <div class="modal-stat modal-rating">
                        ${generateStarRating(extension.rating)}
                        <span>${extension.rating} (${extension.ratingCount})</span>
                    </div>
                    <div class="modal-stat modal-price">${extension.price}</div>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h2 class="modal-section-title">Last updated</h2>
            <p class="modal-last-updated">${extension.lastUpdated} (Version ${extension.version})</p>
        </div>
        
        <div class="modal-section">
            <h2 class="modal-section-title">Categories</h2>
            <div class="modal-categories">
                ${extension.categories.map(cat => `<a href="#" class="modal-category">${cat}</a>`).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h2 class="modal-section-title">Description</h2>
            <p class="modal-description">${extension.description}</p>
        </div>
        
        <div class="modal-section">
            <h2 class="modal-section-title">Installation</h2>
            <div class="installation-box">
                <div class="installation-title">Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.</div>
                <div class="installation-command">
                    <code id="installCommand">ext install ${extension.id}</code>
                    <button class="copy-button" onclick="copyToClipboard('installCommand')">Copy</button>
                </div>
            </div>
            <a href="#" class="more-info">More Info</a>
        </div>
        
        <div class="modal-section">
            <h2 class="modal-section-title">Tags</h2>
            <div class="modal-tags">
                ${extension.tags.map(tag => `<a href="#" class="modal-tag">${tag}</a>`).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('extensionModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Copy to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length === 0) {
            renderExtensions();
            return;
        }
        
        const filteredExtensions = extensionsData.filter(ext => 
            ext.name.toLowerCase().includes(searchTerm) ||
            ext.description.toLowerCase().includes(searchTerm) ||
            ext.author.toLowerCase().includes(searchTerm) ||
            ext.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        const container = document.getElementById('extensionsGrid');
        container.innerHTML = filteredExtensions.map(ext => createExtensionCard(ext)).join('');
        
        // Re-add click handlers
        document.querySelectorAll('.extension-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const extensionId = card.dataset.extensionId;
                openExtensionModal(extensionId);
            });
        });
    });
}

// Fetch extensions from Supabase
async function fetchExtensionsFromSupabase() {
    if (!window.supabaseClient) {
        console.warn('Supabase not configured. Using mock data.');
        extensionsData = mockExtensions;
        renderExtensions();
        return;
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('extensions')
            .select('*')
            .order('installs', { ascending: false });

        if (error) {
            console.error('Error fetching extensions:', error);
            extensionsData = mockExtensions;
        } else {
            extensionsData = data.map(ext => ({
                id: ext.id,
                name: ext.name,
                author: ext.author,
                authorUrl: ext.author_url,
                description: ext.description,
                version: ext.version,
                installs: ext.installs,
                rating: ext.rating,
                ratingCount: ext.rating_count,
                price: ext.price || 'Free',
                categories: ext.categories || [],
                tags: ext.tags || [],
                lastUpdated: ext.last_updated,
                icon: ext.icon
            }));
        }
    } catch (error) {
        console.error('Failed to fetch from Supabase:', error);
        extensionsData = mockExtensions;
    }
    
    renderExtensions();
}

// Update UI based on authentication state
function updateUIForAuth() {
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const userInfo = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (currentUser) {
        signInBtn.style.display = 'none';
        userInfo.style.display = 'inline';
        uploadBtn.style.display = 'inline-block';
        userEmail.textContent = currentUser.email;
    } else {
        signInBtn.style.display = 'inline-block';
        userInfo.style.display = 'none';
        uploadBtn.style.display = 'none';
    }
}

// Authentication functions
async function signIn(email, password) {
    if (!window.supabaseClient) {
        alert('Supabase not configured. Please set up your Supabase credentials.');
        return false;
    }

    try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Sign in error:', error);
        alert('Sign in failed: ' + error.message);
        return false;
    }
}

async function signUp(email, password) {
    if (!window.supabaseClient) {
        alert('Supabase not configured. Please set up your Supabase credentials.');
        return false;
    }

    try {
        const { data, error } = await window.supabaseClient.auth.signUp({
            email: email,
            password: password
        });
        
        if (error) throw error;
        alert('Sign up successful! Please check your email to confirm your account.');
        return true;
    } catch (error) {
        console.error('Sign up error:', error);
        alert('Sign up failed: ' + error.message);
        return false;
    }
}

async function signOut() {
    if (!window.supabaseClient) return;
    
    try {
        await window.supabaseClient.auth.signOut();
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// File upload functions
function handleFileSelect(file) {
    if (!file.name.endsWith('.hsiext') && !file.name.endsWith('.hsixet')) {
        alert('Please select a .hsiext or .hsixet file');
        return;
    }
    
    selectedFile = file;
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('uploadPreview').style.display = 'block';
    document.getElementById('uploadForm').style.display = 'block';
}

function removeSelectedFile() {
    selectedFile = null;
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadForm').style.display = 'none';
}

async function uploadExtension() {
    if (!selectedFile) {
        alert('Please select a file');
        return;
    }
    
    if (!currentUser) {
        alert('Please sign in to upload extensions');
        return;
    }
    
    const name = document.getElementById('extName').value;
    const description = document.getElementById('extDescription').value;
    const version = document.getElementById('extVersion').value;
    const categories = document.getElementById('extCategories').value.split(',').map(c => c.trim()).filter(c => c);
    const tags = document.getElementById('extTags').value.split(',').map(t => t.trim()).filter(t => t);
    
    if (!name || !description || !version) {
        alert('Please fill in all required fields');
        return;
    }
    
    try {
        // Upload file to Supabase Storage
        const filePath = `extensions/${currentUser.id}/${Date.now()}-${selectedFile.name}`;
        const { data: uploadData, error: uploadError } = await window.supabaseClient.storage
            .from('extensions')
            .upload(filePath, selectedFile);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: { publicUrl } } = window.supabaseClient.storage
            .from('extensions')
            .getPublicUrl(filePath);
        
        // Insert extension metadata into database
        const { data, error } = await window.supabaseClient
            .from('extensions')
            .insert([{
                id: `${currentUser.email.split('@')[0]}.${name.toLowerCase().replace(/\s+/g, '-')}`,
                name: name,
                author: currentUser.email,
                author_url: '',
                description: description,
                version: version,
                installs: 0,
                rating: 0.0,
                rating_count: 0,
                price: 'Free',
                categories: categories,
                tags: tags,
                last_updated: new Date().toISOString().split('T')[0],
                icon: null,
                file_url: publicUrl,
                file_path: filePath
            }]);
        
        if (error) throw error;
        
        alert('Extension uploaded successfully!');
        closeUploadModal();
        removeSelectedFile();
        
        // Clear form
        document.getElementById('extName').value = '';
        document.getElementById('extDescription').value = '';
        document.getElementById('extVersion').value = '';
        document.getElementById('extCategories').value = '';
        document.getElementById('extTags').value = '';
        
        // Refresh extensions list
        await fetchExtensionsFromSupabase();
        
    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message);
    }
}

// Modal functions
function openUploadModal() {
    if (!currentUser) {
        alert('Please sign in to upload extensions');
        return;
    }
    document.getElementById('uploadModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch extensions
    await fetchExtensionsFromSupabase();
    
    // Setup search
    setupSearch();
    
    // Modal close buttons
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('uploadModalClose').addEventListener('click', closeUploadModal);
    document.getElementById('authModalClose').addEventListener('click', closeAuthModal);
    
    // Close modals on background click
    document.getElementById('extensionModal').addEventListener('click', (e) => {
        if (e.target.id === 'extensionModal') closeModal();
    });
    document.getElementById('uploadModal').addEventListener('click', (e) => {
        if (e.target.id === 'uploadModal') closeUploadModal();
    });
    document.getElementById('authModal').addEventListener('click', (e) => {
        if (e.target.id === 'authModal') closeAuthModal();
    });
    
    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeUploadModal();
            closeAuthModal();
        }
    });
    
    // Auth buttons
    document.getElementById('signInBtn').addEventListener('click', openAuthModal);
    document.getElementById('signOutBtn').addEventListener('click', signOut);
    document.getElementById('uploadBtn').addEventListener('click', openUploadModal);
    
    // Auth form submission
    let isSignUp = false;
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const authSubmit = document.getElementById('authSubmit');
    const authSwitchText = document.getElementById('authSwitchText');
    const authSwitchBtn = document.getElementById('authSwitchBtn');
    
    authSwitchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isSignUp = !isSignUp;
        authTitle.textContent = isSignUp ? 'Sign Up' : 'Sign In';
        authSubmit.textContent = isSignUp ? 'Sign Up' : 'Sign In';
        authSwitchText.textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
        authSwitchBtn.textContent = isSignUp ? 'Sign In' : 'Sign Up';
    });
    
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        
        let success;
        if (isSignUp) {
            success = await signUp(email, password);
        } else {
            success = await signIn(email, password);
        }
        
        if (success) {
            closeAuthModal();
        }
    });
    
    // File upload
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadArea = document.getElementById('uploadArea');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const submitUpload = document.getElementById('submitUpload');
    
    browseBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-color)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });
    
    removeFileBtn.addEventListener('click', removeSelectedFile);
    submitUpload.addEventListener('click', uploadExtension);
});

// Make functions available globally
window.copyToClipboard = copyToClipboard;
window.closeModal = closeModal;
window.openExtensionModal = openExtensionModal;