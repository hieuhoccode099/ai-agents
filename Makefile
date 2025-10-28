kill-port:
	kill -9 $(lsof -t -i:8009)
