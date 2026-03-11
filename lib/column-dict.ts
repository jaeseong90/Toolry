// 개발에서 자주 사용되는 한글 → 영문 매핑 사전
// 카테고리별로 정리

export interface DictEntry {
  ko: string[];       // 한글 키워드 (동의어 포함)
  en: string;         // 영문 단어
  category: string;
}

export const dictionary: DictEntry[] = [
  // === 사용자/회원 ===
  { ko: ["사용자", "유저", "이용자"], en: "user", category: "사용자" },
  { ko: ["회원"], en: "member", category: "사용자" },
  { ko: ["관리자", "어드민"], en: "admin", category: "사용자" },
  { ko: ["작성자", "글쓴이"], en: "author", category: "사용자" },
  { ko: ["소유자", "소유주"], en: "owner", category: "사용자" },
  { ko: ["계정", "어카운트"], en: "account", category: "사용자" },
  { ko: ["역할", "권한역할"], en: "role", category: "사용자" },
  { ko: ["권한", "퍼미션"], en: "permission", category: "사용자" },
  { ko: ["프로필"], en: "profile", category: "사용자" },
  { ko: ["닉네임", "별명"], en: "nickname", category: "사용자" },
  { ko: ["아이디", "로그인아이디"], en: "login_id", category: "사용자" },
  { ko: ["비밀번호", "패스워드", "암호"], en: "password", category: "사용자" },
  { ko: ["토큰"], en: "token", category: "사용자" },
  { ko: ["세션"], en: "session", category: "사용자" },
  { ko: ["로그인"], en: "login", category: "사용자" },
  { ko: ["로그아웃"], en: "logout", category: "사용자" },

  // === 개인정보 ===
  { ko: ["이름"], en: "name", category: "개인정보" },
  { ko: ["성"], en: "last_name", category: "개인정보" },
  { ko: ["이름(성 제외)", "퍼스트네임"], en: "first_name", category: "개인정보" },
  { ko: ["전체이름", "풀네임"], en: "full_name", category: "개인정보" },
  { ko: ["이메일", "메일"], en: "email", category: "개인정보" },
  { ko: ["전화번호", "핸드폰번호", "휴대폰번호", "연락처", "폰번호"], en: "phone", category: "개인정보" },
  { ko: ["주소"], en: "address", category: "개인정보" },
  { ko: ["상세주소"], en: "address_detail", category: "개인정보" },
  { ko: ["우편번호", "집코드"], en: "zip_code", category: "개인정보" },
  { ko: ["도시", "시"], en: "city", category: "개인정보" },
  { ko: ["국가", "나라"], en: "country", category: "개인정보" },
  { ko: ["생년월일", "생일"], en: "birth_date", category: "개인정보" },
  { ko: ["나이"], en: "age", category: "개인정보" },
  { ko: ["성별"], en: "gender", category: "개인정보" },
  { ko: ["프로필사진", "아바타", "프로필이미지"], en: "avatar", category: "개인정보" },

  // === 상품/제품 ===
  { ko: ["상품", "제품", "물건", "아이템"], en: "product", category: "상품" },
  { ko: ["상품명", "제품명"], en: "product_name", category: "상품" },
  { ko: ["상품코드", "제품코드"], en: "product_code", category: "상품" },
  { ko: ["카테고리", "분류"], en: "category", category: "상품" },
  { ko: ["브랜드", "상표"], en: "brand", category: "상품" },
  { ko: ["재고", "재고수량", "스톡"], en: "stock", category: "상품" },
  { ko: ["모델", "모델명"], en: "model", category: "상품" },
  { ko: ["옵션"], en: "option", category: "상품" },
  { ko: ["변형", "바리안트"], en: "variant", category: "상품" },
  { ko: ["SKU", "스큐"], en: "sku", category: "상품" },
  { ko: ["바코드"], en: "barcode", category: "상품" },

  // === 주문/결제 ===
  { ko: ["주문", "오더"], en: "order", category: "주문" },
  { ko: ["주문번호"], en: "order_number", category: "주문" },
  { ko: ["주문일", "주문날짜", "주문일자"], en: "order_date", category: "주문" },
  { ko: ["결제", "지불", "페이먼트"], en: "payment", category: "주문" },
  { ko: ["결제수단", "결제방법"], en: "payment_method", category: "주문" },
  { ko: ["결제일", "결제날짜"], en: "payment_date", category: "주문" },
  { ko: ["거래", "트랜잭션"], en: "transaction", category: "주문" },
  { ko: ["영수증"], en: "receipt", category: "주문" },
  { ko: ["청구", "빌링", "인보이스"], en: "invoice", category: "주문" },
  { ko: ["환불"], en: "refund", category: "주문" },
  { ko: ["취소"], en: "cancel", category: "주문" },
  { ko: ["반품"], en: "return", category: "주문" },
  { ko: ["교환"], en: "exchange", category: "주문" },
  { ko: ["장바구니", "카트"], en: "cart", category: "주문" },
  { ko: ["위시리스트", "찜", "관심목록"], en: "wishlist", category: "주문" },

  // === 금액/수량 ===
  { ko: ["가격", "가액", "단가"], en: "price", category: "금액" },
  { ko: ["원가", "매입가"], en: "cost", category: "금액" },
  { ko: ["판매가", "판매금액", "세일가격"], en: "sale_price", category: "금액" },
  { ko: ["정가", "정상가"], en: "regular_price", category: "금액" },
  { ko: ["할인", "디스카운트"], en: "discount", category: "금액" },
  { ko: ["할인율", "할인비율"], en: "discount_rate", category: "금액" },
  { ko: ["할인금액", "할인액"], en: "discount_amount", category: "금액" },
  { ko: ["금액", "액수"], en: "amount", category: "금액" },
  { ko: ["총액", "합계", "총합", "토탈"], en: "total", category: "금액" },
  { ko: ["소계"], en: "subtotal", category: "금액" },
  { ko: ["세금", "부가세", "부가가치세", "VAT"], en: "tax", category: "금액" },
  { ko: ["수수료", "수수료율", "커미션"], en: "fee", category: "금액" },
  { ko: ["배송비", "배달비", "운송비"], en: "shipping_fee", category: "금액" },
  { ko: ["쿠폰"], en: "coupon", category: "금액" },
  { ko: ["포인트", "적립금"], en: "point", category: "금액" },
  { ko: ["잔액", "밸런스"], en: "balance", category: "금액" },
  { ko: ["수량", "갯수", "개수"], en: "quantity", category: "금액" },
  { ko: ["통화", "화폐"], en: "currency", category: "금액" },

  // === 날짜/시간 ===
  { ko: ["날짜", "일자", "일시"], en: "date", category: "날짜" },
  { ko: ["시간"], en: "time", category: "날짜" },
  { ko: ["시작일", "시작날짜", "시작일자"], en: "start_date", category: "날짜" },
  { ko: ["종료일", "종료날짜", "마감일", "만료일"], en: "end_date", category: "날짜" },
  { ko: ["기간", "기한"], en: "period", category: "날짜" },
  { ko: ["생성일", "등록일", "작성일"], en: "created_at", category: "날짜" },
  { ko: ["수정일", "변경일", "업데이트일"], en: "updated_at", category: "날짜" },
  { ko: ["삭제일"], en: "deleted_at", category: "날짜" },
  { ko: ["만료일", "유효기간"], en: "expires_at", category: "날짜" },
  { ko: ["예약일", "예약날짜"], en: "reserved_at", category: "날짜" },
  { ko: ["발송일", "전송일"], en: "sent_at", category: "날짜" },
  { ko: ["년", "년도", "연도"], en: "year", category: "날짜" },
  { ko: ["월"], en: "month", category: "날짜" },
  { ko: ["일"], en: "day", category: "날짜" },

  // === 상태/플래그 ===
  { ko: ["상태", "스테이터스"], en: "status", category: "상태" },
  { ko: ["활성", "활성화"], en: "is_active", category: "상태" },
  { ko: ["비활성", "비활성화"], en: "is_inactive", category: "상태" },
  { ko: ["삭제여부", "삭제됨"], en: "is_deleted", category: "상태" },
  { ko: ["사용여부", "사용가능"], en: "is_enabled", category: "상태" },
  { ko: ["공개", "공개여부"], en: "is_public", category: "상태" },
  { ko: ["비공개"], en: "is_private", category: "상태" },
  { ko: ["인증", "인증여부", "검증"], en: "is_verified", category: "상태" },
  { ko: ["승인", "승인여부"], en: "is_approved", category: "상태" },
  { ko: ["읽음", "읽음여부"], en: "is_read", category: "상태" },
  { ko: ["완료", "완료여부"], en: "is_completed", category: "상태" },
  { ko: ["대기", "대기중", "펜딩"], en: "pending", category: "상태" },
  { ko: ["처리중", "진행중"], en: "in_progress", category: "상태" },
  { ko: ["우선순위"], en: "priority", category: "상태" },
  { ko: ["레벨", "등급", "수준"], en: "level", category: "상태" },
  { ko: ["타입", "유형", "종류"], en: "type", category: "상태" },
  { ko: ["플래그", "깃발"], en: "flag", category: "상태" },

  // === 콘텐츠 ===
  { ko: ["제목", "타이틀"], en: "title", category: "콘텐츠" },
  { ko: ["내용", "본문", "콘텐츠"], en: "content", category: "콘텐츠" },
  { ko: ["설명", "디스크립션", "소개"], en: "description", category: "콘텐츠" },
  { ko: ["요약", "줄거리"], en: "summary", category: "콘텐츠" },
  { ko: ["댓글", "코멘트"], en: "comment", category: "콘텐츠" },
  { ko: ["답글", "답변", "리플라이"], en: "reply", category: "콘텐츠" },
  { ko: ["게시글", "게시물", "글", "포스트"], en: "post", category: "콘텐츠" },
  { ko: ["게시판", "보드"], en: "board", category: "콘텐츠" },
  { ko: ["공지", "공지사항"], en: "notice", category: "콘텐츠" },
  { ko: ["알림", "노티", "노티피케이션"], en: "notification", category: "콘텐츠" },
  { ko: ["메시지", "메세지"], en: "message", category: "콘텐츠" },
  { ko: ["태그"], en: "tag", category: "콘텐츠" },
  { ko: ["키워드", "검색어"], en: "keyword", category: "콘텐츠" },
  { ko: ["리뷰", "후기", "평가"], en: "review", category: "콘텐츠" },
  { ko: ["평점", "별점", "점수"], en: "rating", category: "콘텐츠" },
  { ko: ["좋아요", "추천"], en: "like", category: "콘텐츠" },
  { ko: ["조회수", "뷰"], en: "view_count", category: "콘텐츠" },
  { ko: ["첨부", "첨부파일"], en: "attachment", category: "콘텐츠" },
  { ko: ["슬러그"], en: "slug", category: "콘텐츠" },

  // === 파일/미디어 ===
  { ko: ["이미지", "사진", "그림"], en: "image", category: "파일" },
  { ko: ["썸네일", "미리보기"], en: "thumbnail", category: "파일" },
  { ko: ["파일"], en: "file", category: "파일" },
  { ko: ["파일명", "파일이름"], en: "file_name", category: "파일" },
  { ko: ["파일경로", "경로"], en: "file_path", category: "파일" },
  { ko: ["파일크기", "용량", "사이즈"], en: "file_size", category: "파일" },
  { ko: ["확장자"], en: "extension", category: "파일" },
  { ko: ["URL", "주소", "링크"], en: "url", category: "파일" },
  { ko: ["비디오", "동영상", "영상"], en: "video", category: "파일" },
  { ko: ["오디오", "음성", "소리"], en: "audio", category: "파일" },

  // === 식별자/공통 ===
  { ko: ["아이디", "식별자", "고유번호", "ID"], en: "id", category: "공통" },
  { ko: ["코드", "번호"], en: "code", category: "공통" },
  { ko: ["키", "열쇠"], en: "key", category: "공통" },
  { ko: ["값"], en: "value", category: "공통" },
  { ko: ["순서", "정렬순서", "순번", "차례"], en: "sort_order", category: "공통" },
  { ko: ["깊이", "뎁스"], en: "depth", category: "공통" },
  { ko: ["부모"], en: "parent", category: "공통" },
  { ko: ["자식", "하위"], en: "child", category: "공통" },
  { ko: ["목록", "리스트"], en: "list", category: "공통" },
  { ko: ["그룹"], en: "group", category: "공통" },
  { ko: ["버전"], en: "version", category: "공통" },
  { ko: ["메모", "노트", "비고"], en: "note", category: "공통" },
  { ko: ["라벨", "레이블"], en: "label", category: "공통" },
  { ko: ["색상", "컬러"], en: "color", category: "공통" },
  { ko: ["아이콘"], en: "icon", category: "공통" },
  { ko: ["위치", "위도경도"], en: "location", category: "공통" },
  { ko: ["위도"], en: "latitude", category: "공통" },
  { ko: ["경도"], en: "longitude", category: "공통" },
  { ko: ["너비", "가로", "폭"], en: "width", category: "공통" },
  { ko: ["높이", "세로"], en: "height", category: "공통" },
  { ko: ["개수", "카운트"], en: "count", category: "공통" },
  { ko: ["최대", "최댓값"], en: "max", category: "공통" },
  { ko: ["최소", "최솟값"], en: "min", category: "공통" },
  { ko: ["기본", "기본값", "디폴트"], en: "default", category: "공통" },
  { ko: ["설정", "세팅", "환경설정"], en: "config", category: "공통" },
  { ko: ["로그", "기록"], en: "log", category: "공통" },
  { ko: ["이력", "히스토리"], en: "history", category: "공통" },
  { ko: ["결과", "리절트"], en: "result", category: "공통" },
  { ko: ["원인", "사유", "이유"], en: "reason", category: "공통" },

  // === 배송 ===
  { ko: ["배송", "배달", "발송"], en: "shipping", category: "배송" },
  { ko: ["배송지", "배송주소"], en: "shipping_address", category: "배송" },
  { ko: ["수령인", "받는사람"], en: "recipient", category: "배송" },
  { ko: ["운송장번호", "트래킹번호", "송장번호"], en: "tracking_number", category: "배송" },
  { ko: ["택배사", "배송업체"], en: "carrier", category: "배송" },

  // === 회사/조직 ===
  { ko: ["회사", "기업"], en: "company", category: "조직" },
  { ko: ["부서", "팀"], en: "department", category: "조직" },
  { ko: ["직위", "직급", "직책"], en: "position", category: "조직" },
  { ko: ["직원", "사원"], en: "employee", category: "조직" },
  { ko: ["고객", "거래처", "클라이언트"], en: "client", category: "조직" },
  { ko: ["공급업체", "벤더", "공급사"], en: "vendor", category: "조직" },
  { ko: ["프로젝트"], en: "project", category: "조직" },
  { ko: ["업무", "작업", "태스크"], en: "task", category: "조직" },
  { ko: ["일정", "스케줄"], en: "schedule", category: "조직" },
  { ko: ["회의", "미팅"], en: "meeting", category: "조직" },
  { ko: ["계약", "계약서"], en: "contract", category: "조직" },
  { ko: ["급여", "월급", "연봉"], en: "salary", category: "조직" },
];

// 빠른 검색을 위한 인덱스 생성
export function searchDictionary(query: string): DictEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // 정확히 일치하는 것 먼저
  const exact: DictEntry[] = [];
  const partial: DictEntry[] = [];

  for (const entry of dictionary) {
    const isExact = entry.ko.some((k) => k === q);
    const isPartial = !isExact && entry.ko.some((k) => k.includes(q) || q.includes(k));
    const isEnMatch = !isExact && !isPartial && entry.en.toLowerCase().includes(q);

    if (isExact) exact.push(entry);
    else if (isPartial || isEnMatch) partial.push(entry);
  }

  return [...exact, ...partial];
}
