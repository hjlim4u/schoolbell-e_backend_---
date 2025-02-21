# 알고리즘 문제 풀이: 최대 곱 찾기

## 문제 설명
주어진 숫자들(1, 3, 5, 7, 9)을 각각 한 번씩만 사용하여 만들 수 있는 두 개의 숫자(예: 13, 579) 중에서, 그 곱이 가장 큰 조합을 찾는 문제입니다.

## 풀이 접근 방법

1. **숫자 조합 생성**
   - 주어진 숫자들을 두 그룹으로 나누는 모든 가능한 조합을 생성합니다.
   - 첫 번째 그룹의 길이를 1부터 전체 길이의 절반까지 순회하며 조합을 만듭니다.

2. **조합 처리 과정**
   - 각 조합에 대해:
     1. 첫 번째 그룹의 숫자들을 내림차순으로 정렬하여 하나의 숫자로 만듭니다.
     2. 남은 숫자들(두 번째 그룹)도 내림차순으로 정렬하여 하나의 숫자로 만듭니다.
     3. 두 숫자의 곱을 계산합니다.
     4. 현재까지의 최대 곱과 비교하여 더 큰 경우 결과를 업데이트합니다.

3. **결과 도출**
   - 모든 조합을 확인한 후, 가장 큰 곱을 만드는 두 숫자를 반환합니다.

## 주요 함수 설명

### findMaxProduct 함수
- 입력: 숫자 배열
- 출력: 최대 곱을 만드는 두 숫자와 그 곱을 포함하는 객체
- 동작: 가능한 모든 조합을 확인하며 최대 곱을 찾습니다.

### getCombinations 함수
- 입력: 숫자 배열, 목표 길이, 현재 조합, 시작 인덱스
- 출력: 가능한 모든 조합의 배열
- 동작: 재귀적으로 모든 가능한 조합을 생성합니다.

## 실행 결과
- 입력: [1, 3, 5, 7, 9]
- 출력: 13, 579
- 설명: 13과 579의 조합이 가장 큰 곱을 만듭니다.

## 시간 복잡도
- 조합의 생성으로 인해 O(2^n)의 시간 복잡도를 가집니다.
- n은 입력 배열의 길이입니다.

---

# 섬 개수 찾기 알고리즘 (Island Counter)

## 문제 설명
주어진 그리드에서 Island의 개수를 찾는 문제입니다. 여기서 Island는 가로, 세로, 대각선으로 연결된 Land(1)들의 집합을 의미합니다.
- Land는 1로 표시
- Sea는 0으로 표시
- 8방향(상, 하, 좌, 우, 대각선)으로 연결된 Land는 하나의 Island로 간주

## 풀이 접근 방법

1. **DFS(깊이 우선 탐색) 활용**
   - 그리드를 순회하면서 Land(1)를 발견하면 DFS를 시작합니다.
   - DFS로 연결된 모든 Land를 방문하고 방문한 곳은 0으로 표시(방문 처리)합니다.
   - 하나의 DFS 탐색이 끝나면 하나의 Island를 찾은 것입니다.

2. **8방향 탐색**
   - 현재 위치에서 8방향(상, 하, 좌, 우, 대각선)을 모두 확인합니다.
   - 방향 배열을 사용하여 효율적으로 구현:
     ```typescript
     const directions = [
         [-1, -1], [-1, 0], [-1, 1],
         [0, -1],          [0, 1],
         [1, -1],  [1, 0],  [1, 1]
     ];
     ```

3. **경계 조건 처리**
   - 그리드 범위를 벗어나는 경우
   - 이미 방문했거나 바다(0)인 경우
   - 위의 경우들은 탐색을 중단하고 반환

## 주요 함수 설명

### countIslands 함수
- 입력: 2차원 숫자 배열(그리드)
- 출력: 발견된 Island의 개수
- 동작: 그리드를 순회하며 Land를 발견할 때마다 DFS 실행

### dfs 함수
- 입력: 현재 위치의 행(row)과 열(col)
- 동작: 
  - 현재 위치에서 시작하여 연결된 모든 Land를 방문
  - 방문한 Land는 0으로 변경(방문 처리)
  - 8방향으로 재귀적 탐색 수행

## 실행 결과
- 입력: 4x5 그리드
- 출력: 1 (모든 Land가 하나의 Island로 연결되어 있음)

## 시간 복잡도
- O(N × M): N은 행의 수, M은 열의 수
- 각 셀을 최대 한 번씩만 방문하므로 전체 그리드 크기에 비례

## 공간 복잡도
- O(N × M): 최악의 경우 재귀 호출 스택의 깊이
- 실제로는 대부분의 경우 이보다 훨씬 적은 공간을 사용 

---

# 결재 시스템 데이터베이스 설계 (Approval System Database Design)

## 문제 설명
MySQL 또는 PostgreSQL을 사용하여 여러 단계의 승인 및 반려가 가능한 결재 시스템을 구축하는 문제입니다.

## 데이터베이스 설계

### 1. 테이블 구조

#### users (사용자 테이블)
- `user_id`: INT, PRIMARY KEY, AUTO_INCREMENT
- `username`: VARCHAR(50), NOT NULL
- `department`: VARCHAR(50)
- `position`: VARCHAR(50)
- `created_at`: TIMESTAMP

#### approval_documents (결재 문서 테이블)
- `document_id`: INT, PRIMARY KEY, AUTO_INCREMENT
- `title`: VARCHAR(200), NOT NULL
- `content`: TEXT
- `requester_id`: INT, NOT NULL (FOREIGN KEY → users)
- `created_at`: TIMESTAMP

#### approval_lines (결재선 테이블)
- `line_id`: INT, PRIMARY KEY, AUTO_INCREMENT
- `document_id`: INT, NOT NULL (FOREIGN KEY → approval_documents)
- `approver_id`: INT, NOT NULL (FOREIGN KEY → users)
- `approval_order`: INT, NOT NULL
- `status`: VARCHAR(20) (PENDING, APPROVED, REJECTED)
- `comment`: TEXT
- `recent_approved_at`: TIMESTAMP

### 2. 주요 기능 구현

#### 결재 대기 문서 조회 쿼리
```sql
SELECT 
    ad.document_id,
    ad.title,
    ad.content,
    u.username as requester_name,
    ad.created_at,
    al.approval_order
FROM approval_documents ad
JOIN approval_lines al ON ad.document_id = al.document_id
JOIN users u ON ad.requester_id = u.user_id
WHERE al.approver_id = @current_user_id  -- 현재 로그인한 사용자 ID
AND al.status = 'PENDING'  -- 아직 처리하지 않은 건
AND NOT EXISTS (  -- 이전 단계가 모두 승인된 건만 조회
    SELECT 1 
    FROM approval_lines prev
    WHERE prev.document_id = ad.document_id
    AND prev.approval_order < al.approval_order
    AND prev.status != 'APPROVED'
)
ORDER BY ad.created_at ASC;
```

## 설계 특징

1. **다단계 결재 프로세스**
   - `approval_order`를 통해 결재 순서 관리
   - 이전 단계가 모두 승인되어야 다음 단계 진행 가능

2. **결재 상태 관리**
   - PENDING: 결재 대기
   - APPROVED: 승인
   - REJECTED: 반려
   - NULL: 이전 단계 반려 혹은 승인 대기

3. **데이터 무결성**
   - 외래 키 제약 조건을 통한 참조 무결성 보장
   - 각 테이블 간의 관계 명확히 정의

4. **시간 정보 관리**
   - 문서 생성 시간
   - 결재 처리 시간 기록

## 쿼리 설명

### 결재 대기 문서 조회 쿼리 동작 방식
1. **기본 조인**
   - 결재 문서, 결재선, 사용자 정보를 조인하여 필요한 정보 조회

2. **조건 필터링**
   - 현재 사용자의 결재 대기 문서만 필터링
   - 결재 상태가 'PENDING'인 문서만 선택

3. **이전 단계 확인**
   - NOT EXISTS 서브쿼리를 통해 이전 단계가 모두 승인된 문서만 조회
   - 결재 순서(approval_order) 비교를 통해 구현

4. **정렬**
   - 문서 생성 시간 순으로 정렬하여 오래된 문서부터 처리
