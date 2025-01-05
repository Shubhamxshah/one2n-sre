.PHONY: deploy clean logs

deploy:
	docker compose up -d

clean:
	docker compose down 

logs:
	docker compose logs -f

reload-nginx:
	docker compose restart nginx
