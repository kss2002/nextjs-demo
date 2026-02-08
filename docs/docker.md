# Docker 설정

## 개요

Docker를 사용하여 PostgreSQL 데이터베이스를 로컬에서 실행합니다.
Docker Compose를 통해 간편하게 관리할 수 있습니다.

## 사전 요구사항

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 설치

## Docker Compose 설정

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: next-demo-postgres
    restart: unless-stopped
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: next_demo
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## 설정 설명

| 항목                | 값                 | 설명                      |
| ------------------- | ------------------ | ------------------------- |
| `image`             | postgres:16-alpine | PostgreSQL 16 경량 이미지 |
| `ports`             | 5432:5432          | 호스트:컨테이너 포트 매핑 |
| `POSTGRES_USER`     | postgres           | 데이터베이스 사용자       |
| `POSTGRES_PASSWORD` | postgres           | 데이터베이스 비밀번호     |
| `POSTGRES_DB`       | next_demo          | 기본 데이터베이스 이름    |
| `volumes`           | postgres_data      | 데이터 영속성을 위한 볼륨 |

## 주요 명령어

```bash
# 컨테이너 시작 (백그라운드)
yarn db:up

# 컨테이너 중지
yarn db:down

# 컨테이너 로그 확인
docker logs next-demo-postgres

# 컨테이너 상태 확인
docker ps
```

## 데이터 영속성

`volumes`를 설정했기 때문에 다음 상황에서도 데이터가 유지됩니다:

- ✅ `yarn db:down` → `yarn db:up`
- ✅ Docker Desktop 재시작
- ✅ Mac 재시작

**데이터 삭제 시:**

```bash
# 볼륨까지 삭제 (데이터 영구 삭제)
docker compose down -v
```

## 환경 변수

```bash
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/next_demo?schema=public"
```

## 문제 해결

### "docker: command not found"

Docker Desktop이 설치되어 있는지 확인하고, 실행 중인지 확인하세요.

### 포트 충돌 (5432)

다른 PostgreSQL이 실행 중이면 포트를 변경하세요:

```yaml
ports:
  - '5433:5432'
```

.env도 함께 수정:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/next_demo?schema=public"
```
