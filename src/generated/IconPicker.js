
    export const template = `<div x-data="IconPicker">
        <!-- Main Button -->
        <label class="block text-sm font-medium text-gray-700 mb-2">Icon</label>
        <button @click="loadIcons" class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors w-full">
            <span>Select Icon</span>
        </button>

        <!-- Modal -->
        <div x-show="isOpen" x-transition class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div @click.away="isOpen = false" class="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <!-- Modal Header -->
                <div class="p-4 border-b border-gray-300">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-semibold">Select an Icon</h2>
                        <button @click="isOpen = false" class="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- Loading State -->
                <div x-show="loading" class="p-8 text-center">
                    <svg class="animate-spin h-8 w-8 mx-auto text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p class="mt-2 text-gray-600">Loading icons...</p>
                </div>
                <!-- Icons Grid -->
                <div x-show="!loading" class="p-4 overflow-y-auto max-h-[60vh]">
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                        <template x-for="[name, icon] in icons" :key="name">
                            <button @click="selectIcon(name)" class="p-3 rounded-lg hover:bg-gray-100 flex flex-col items-center gap-2 transition-colors" :class="{'bg-blue-50 ring-2 ring-blue-500': selectedIcon === name}">
                                <div x-html="getSvgContent(icon)" class="w-6 h-6"></div>
                                <span class="text-xs text-gray-600 truncate max-w-full" x-text="name"></span>
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    export function IconPicker() {
        return {
            isOpen: false,
            selectedIcon: null,
            icons: [],
            loading: false,

            async loadIcons() {
                if (this.icons.length === 0) {
                    this.loading = true;
                    try {
                        const response = await fetch('/icons.json');
                        const data = await response.json();
                        this.icons = data.icons;
                    } catch (error) {
                        console.error('Error loading icons:', error);
                    }
                    this.loading = false;
                }
                this.isOpen = true;
            },

            selectIcon(iconName) {
                this.selectedIcon = iconName;

                let svg = this.getSvgContent(this.icons.find(([name]) => name === iconName)[1]);
                Alpine.store('app').data.posts[Alpine.store('editor').curIndex].icon = svg;
                this.isOpen = false;
            },

            getSvgContent(iconData) {
                return iconData;
            },
        };
    }

    const style = `/* Add your styles here */`;
    if (style) {
      const styleElement = document.createElement('style');
      styleElement.textContent = style;
      document.head.appendChild(styleElement);
    }
  