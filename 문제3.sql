-- 사용자 테이블
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    department VARCHAR(50),
    position VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 결재 문서 테이블
CREATE TABLE approval_documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    requester_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(user_id)
);

-- 결재선 테이블 (결재 단계 최신 정보)
CREATE TABLE approval_lines (
    line_id INT PRIMARY KEY AUTO_INCREMENT,
    document_id INT NOT NULL,
    approver_id INT NOT NULL,
    approval_order INT NOT NULL, -- 결재 순서
    status VARCHAR(20), -- PENDING, APPROVED, REJECTED // NULL 허용(이전 단계 반려 혹은 승인 대기)
    comment TEXT,
    recent_approved_at TIMESTAMP NULL,
    FOREIGN KEY (document_id) REFERENCES approval_documents(document_id),
    FOREIGN KEY (approver_id) REFERENCES users(user_id)
);

-- 특정 사용자가 처리해야 할 결재 건을 조회하는 쿼리
SET @current_user_id := 1; -- 현재 로그인한 사용자 ID
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