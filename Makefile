FRONTEND_DIR = frontend/lms
BACKEND_DIR = backend/lmsbackend

# Target to run frontend
.PHONY: frontend
frontend:
	cd $(FRONTEND_DIR) && npm start

# Target to run backend
.PHONY: backend
backend:
	cd $(BACKEND_DIR) && python manage.py runserver

# Target to run both frontend and backend in parallel
.PHONY: run
run:
	cd $(FRONTEND_DIR) && npm start &
	cd $(BACKEND_DIR) && python manage.py runserver
