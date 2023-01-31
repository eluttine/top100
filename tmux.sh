#!/bin/sh
#
# Setup a work space called `work` with two windows
# first window has 3 panes. 
# The first pane set at 65%, split horizontally, set to api root and running vim
# pane 2 is split at 25% and running redis-server 
# pane 3 is set to api root and bash prompt.
# note: `api` aliased to `cd ~/path/to/work`
#
session="top-100"

# set up tmux
tmux start-server

# create a new tmux session, starting vim from a saved session in the new window
tmux new-session -d -s $session -n top100 #"vim -S ~/.vim/sessions/kittybusiness"

# Select pane 1, start PB
tmux selectp -t 1 
tmux send-keys "cd ~/top100/pb; go run main.go serve" C-m 

# Split pane 2, start UI
tmux splitw -h
tmux send-keys "cd ~/top100/next; npm run dev" C-m 

# Finished setup, attach to the tmux session!
tmux attach-session -t $session
