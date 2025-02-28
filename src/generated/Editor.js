
    export const template = `<!-- Sidebar -->
    <div x-data="myEditor" x-cloak @keydown.escape.window="$store.editor.close()">
        <!-- Backdrop -->
        <div x-show="$store.editor.isOpen" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" @click="$store.editor.close()"></div>

        <!-- Sidebar panel -->
        <div x-show="$store.editor.isOpen" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="translate-x-0" x-transition:leave-end="translate-x-full" class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg flex flex-col justify-between">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-semibold">Edit Item</h2>
                    <button @click="$store.editor.close()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <template x-if="$store.editor.curIndex !== false">
                    <div class="space-y-4" spellcheck="false">
                        <template x-if="$store.editor.curFields.includes('pretitle')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Pretitle </label>
                                <input type="text" :class="formInput" placeholder="Enter pretitle" x-model="$store.app.data.posts[$store.editor.curIndex].pretitle" />
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('title')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Title </label>
                                <input type="text" :class="formInput" placeholder="Enter title" x-model="$store.app.data.posts[$store.editor.curIndex].title" />
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('subtitle')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Subtitle </label>
                                <input type="text" :class="formInput" placeholder="Enter title" x-model="$store.app.data.posts[$store.editor.curIndex].subtitle" />
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('description')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea :class="formInput" rows="4" placeholder="Enter description" x-model="$store.app.data.posts[$store.editor.curIndex].description"></textarea>
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('body')">
                            <div class="space-y-2">
                                <div class="flex gap-1">
                                    <button @click="execCommand('bold')" class="p-1 hover:bg-gray-100 rounded" title="Bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" /></svg>
                                    </button>
                                    <button @click="execCommand('italic')" class="p-1 hover:bg-gray-100 rounded" title="Italic">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                                            <line x1="19" x2="10" y1="4" y2="4" />
                                            <line x1="14" x2="5" y1="20" y2="20" />
                                            <line x1="15" x2="9" y1="4" y2="20" />
                                        </svg>
                                    </button>
                                    <button @click="addLink()" class="p-1 hover:bg-gray-100 rounded" title="Add Link">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div id="rte-body" x-ref="richTextEditor" contenteditable="true" @input="handleRichTextChange" class="min-h-[150px] px-3 pt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto" style="height: 150px"></div>
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('info')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Info </label>
                                <textarea :class="formInput" class="resize-none" rows="4" x-model="$store.app.data.posts[$store.editor.curIndex].info" style="resize: none:"></textarea>
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('image')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <span>
                                    <button @click="triggerImageUpload($store.editor.curIndex)" class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors w-full">Select Image</button>
                                    <input type="file" accept="image/*" @change="handleImageUpload($event)" x-ref="imageInput" class="hidden" />
                                </span>
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('caption')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Caption </label>
                                <input type="text" :class="formInput" placeholder="Enter title" x-model="$store.app.data.posts[$store.editor.curIndex].caption" />
                            </div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('icon')">
                            <div id="icon-picker"></div>
                        </template>

                        <template x-if="$store.editor.curFields.includes('add')">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Add/Delete</label>

                                <div class="flex w-full max-w-2xl rounded-md shadow-sm" role="group">
                                    <button @click="addPost" type="button" class="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-l-lg hover:bg-blue-500 hover:text-white hover:border-blue-500 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                        </svg>
                                        Add Post
                                    </button>
                                    <button @click="deletePost($store.app.data.posts[$store.editor.curIndex].id)" type="button" class="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-r-lg hover:bg-red-500 hover:text-white hover:border-red-500 focus:z-10 focus:ring-2 focus:ring-red-400 focus:text-white transition-colors" style="border-left: 0">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                        Delete Post
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
            <div class="p-6">
                <button type="button" @click="save" class="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Save</button>
            </div>
        </div>
    </div>`;

    import pica from 'pica';
    export function myEditor() {
        return {
            formInput: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',

            save() {
                console.log(Alpine.store('app').data);
                Alpine.store('editor').close();
            },
            triggerImageUpload(blockId) {
                this.$refs.imageInput.click();
            },
            async handleImageUpload(event) {
                const input = event.target;
                if (!input.files?.length) return;

                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = async (e) => {
                    const img = new Image();
                    img.onload = async () => {
                        const canvas = document.createElement('canvas');
                        // const pica = new Pica();

                        // Calculate new dimensions maintaining aspect ratio
                        const aspectRatio = img.width / img.height;
                        const newWidth = 750;
                        const newHeight = newWidth / aspectRatio;

                        // Set canvas dimensions
                        canvas.width = newWidth;
                        canvas.height = newHeight;

                        // Use Pica to resize the image
                        try {
                            await pica().resize(img, canvas);

                            // Convert to base64
                            const resizedImage = canvas.toDataURL('image/jpeg', 0.85);

                            // Update block content
                            Alpine.store('app').data.posts[Alpine.store('editor').curIndex].image = resizedImage;
                        } catch (error) {
                            console.error('Error resizing image:', error);
                        }
                    };
                    img.src = e.target?.result;
                };

                reader.readAsDataURL(file);

                // Reset file input
                input.value = '';
            },

            execCommand(command, value) {
                document.execCommand(command, false, value);
                const editor = this.$refs.richTextEditor;
                if (this.selectedBlock) {
                    this.selectedBlock.content = editor.innerHTML;
                }
            },

            addLink() {
                const url = prompt('Enter URL:');
                if (url) {
                    this.execCommand('createLink', url);
                }
            },

            handleRichTextChange() {
                const editor = this.$refs.richTextEditor;
                Alpine.store('app').data.posts[Alpine.store('editor').curIndex].body = editor.innerHTML;
            },

            addPost() {
                let newItem = {};
                newItem.id = Math.random().toString(36).substr(2, 6);
                newItem.layout = 'post';
                newItem.title = 'Lorem ipsum';
                newItem.description = 'Lorem ipsum dolor site amet';
                newItem.image = 'https://alpinejs-page-builder.vercel.app/placeholder.jpg';
                const posts = Alpine.store('app').data.posts;
                posts.unshift(newItem);
                // Force update by reassigning the array
                Alpine.store('app').data.posts = [...posts];
                console.log('force re-render');

                // Use setTimeout to ensure the DOM has updated before clicking
                setTimeout(() => {
                    const newPostElement = document.querySelector('[data-edit="' + newItem.id + '"]');
                    if (newPostElement) {
                        newPostElement.click();
                    } else {
                        console.warn('New post element not found');
                    }
                }, 150);
            },

            deletePost(id) {
                if (confirm('Are you sure you want to delete this item?')) {
                    const posts = Alpine.store('app').data.posts;
                    // Filter out the post with the specified ID
                    const updatedPosts = posts.filter((post) => post.id !== id);
                    // Reassign the filtered array to trigger reactivity
                    Alpine.store('app').data.posts = updatedPosts;

                    Alpine.store('editor').close();
                }
            },
        };
    }

    const style = `[data-edit] {
        border: 1px solid transparent !important;
        cursor: pointer;
    }

    [data-edit]:hover {
        border: 1px dashed #999 !important;
        cursor: pointer;
    }

    a {
        text-decoration: underline;
    }`;
    if (style) {
      const styleElement = document.createElement('style');
      styleElement.textContent = style;
      document.head.appendChild(styleElement);
    }
  