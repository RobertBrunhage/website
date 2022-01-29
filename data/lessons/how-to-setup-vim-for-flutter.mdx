---
title: Flutter Vim Setup to Become a 10x Developer
description: Become the next 10x developer and learn how you can use vim in Flutter development!
image: /assets/images/vim_for_flutter_setup_thumbnail.webp
youtube: -0RiAlOXGYs
author: Robert Brunhage
date: 04-24-2021
---

I have been on and off using neovim for Flutter development, switching between VSCode and neovim (in the terminal). I have finally gotten to a stage where I feel like I can be just as productive but also never touch the mouse during coding..


## My setup

We start with the mindset that we have already installed neovim, if you haven't, I recommend going to [neovim.io](https://neovim.io/) and installing that! After that is done you should now be able to create/edit a file called `init.vim`. This file will host all configuration for your vim experience!

Now when we have the basic things located we can  really get in to it!

### Installing a plugin manager

So if you are used to VSCode you have probably installed extensions before. Well a plugin manager such as [plug](https://github.com/junegunn/vim-plug) lets us do just that! I personally use the one mentioned but there are tons of different ones so just pick one you prefer or go with the one I use.

Follow the instructions to install and then start editing in the `init.vim` file with `nvim init.vim` we can start by doing the following:

```vim
call plug#begin('~/AppData/Local/nvim/plugged')
" Inside here we add our plugins
call plug#end()
```

Now when we have our plugin manager installed and ready we can start installing the extensions (plugins)!

### Installing some plugins

With [plug](https://github.com/junegunn/vim-plug) there are one main command we need to know when installing plugins which is `PlugInstall`.

Here is a list of plugins that should be able to get you started with Flutter development in neovim!

```vim
call plug#begin('~/AppData/Local/nvim/plugged')

" File and folder management
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'junegunn/fzf.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'preservim/nerdtree'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'

" Snippets
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'
Plug 'natebosch/dartlang-snippets'

" Language support
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'jiangmiao/auto-pairs'

" Dart
Plug 'dart-lang/dart-vim-plugin'

" Git
Plug 'vim-airline/vim-airline'

" Theme
Plug 'morhetz/gruvbox'
call plug#end()
```

When these are added go ahead and write `:PlugInstall:` which will start downloading and installing the plugins.


### We are not 100% done

There are a few more things except for just adding some keybinds and that is installing some `coc-extensions`. This is a plugin we added earlier which will handle the different programming languages (in simple terms). For example when we add the following in our `init.vim` we should have Flutter support!

```vim
"coc config
let g:coc_global_extensions = [
  \ 'coc-snippets',
  \ 'coc-flutter',
  \ ]
```

Now when we source the file and reopen those extensions should be installed!

### Some personal setup

Now comes the fun part, which is setting up the config as you want it! With the previous setup that was shown, you should be able to do everything BUT it's a bit of a pain writing all the commands we need to be able to do. For example to open the explorer on the right side for the file we need to write `:NERDTreeToggle`.

As I was used to using VSCode a lot I personally set some of the keybinds to be similar as VSCode. One example of this is to open NERDTree which I now do with `CTRL+b`. Below you can find my config which should hopefully make it a bit easier!

```vim
call plug#begin('~/AppData/Local/nvim/plugged')

" File and folder management
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'junegunn/fzf.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'preservim/nerdtree'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'

" Snippets
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'
Plug 'natebosch/dartlang-snippets'

" Language support
Plug 'tpope/vim-projectionist'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'jiangmiao/auto-pairs'

" Dart
Plug 'dart-lang/dart-vim-plugin'

" Git
Plug 'tpope/vim-fugitive'
Plug 'vim-airline/vim-airline'

" Theme
Plug 'morhetz/gruvbox'
call plug#end()

colorscheme gruvbox

set noerrorbells                                              " Don't add sounds for errors
set number
set nowrap
set nohlsearch
set smartcase
set noswapfile
set nobackup
set undodir=~/AppData/Local/nvim-data/backup
set undofile
set incsearch
set tabstop=2
set softtabstop=0 noexpandtab
set shiftwidth=2
set colorcolumn=120
set clipboard=unnamedplus
set backspace=indent,eol,start
highlight ColorColumn ctermbg=0 guibg=lightgrey

let mapleader=" "
nnoremap <leader>fe :CocCommand flutter.emulators <CR>
nnoremap <leader>fd :below new output:///flutter-dev <CR>
map <leader>h :wincmd h <CR>
map <leader>j :wincmd j <CR>
map <leader>k :wincmd k <CR>
map <leader>l :wincmd l <CR>

nnoremap <C-b> :NERDTreeToggle<CR>

let g:dart_format_on_save = 1
let g:dartfmt_options = ['--fix', '--line-length 120']

" Coc
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Symbol renaming.
nmap <leader>rn <Plug>(coc-rename)

" Use K to show documentation in preview window
nnoremap <silent> K :call <SID>show_documentation()<CR>
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  elseif (coc#rpc#ready())
    call CocActionAsync('doHover')
  else
    execute '!' . &keywordprg . " " . expand('<cword>')
  endif
endfunction

nmap <C-P> :FZF<CR>

nmap <leader>gs :G<CR>
nmap <leader>gh :diffget //2<CR>
nmap <leader>gl :diffget //3<CR>

imap <tab> <Plug>(coc-snippets-expand)
let g:UltiSnipsExpandTrigger = '<Nop>'
let g:coc_snippet_next = '<TAB>'
let g:coc_snippet_prev = '<S-TAB>'

" Use <c-space> to trigger completion.
if has('nvim')
  inoremap <silent><expr> <c-space> coc#refresh()
else
  inoremap <silent><expr> <c-@> coc#refresh()
endif

" Applying codeAction to the selected region.
" Example: `<leader>aap` for current paragraph
xmap <leader>a <Plug>(coc-codeaction-selected)
nmap <leader>a <Plug>(coc-codeaction-selected)

"coc config
let g:coc_global_extensions = [
  \ 'coc-flutter',
  \ 'coc-snippets',
  \ 'coc-yaml',
  \ ]

let g:NERDTreeGitStatusWithFlags = 1
```

Remember, these are all personal (I removed all typescript configs). but should get you a good starting point!

### Summary

I have started doing all my development with the keyboard and it's hard to explain but I have to say the feeling is **AMAZING**. There is nothing really more for me to say here except to if you are interested, just try it out. It's a lot to get  used to and not close to the plug and play you get with a IDE. BUT you will get the 10x developer bragging rights 😉
