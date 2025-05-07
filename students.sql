CREATE TABLE students (
	enrollment_year int4 NULL, -- 입학년도
	grade int4 NULL, -- 학년
	"class" int4 NULL, -- 반
	student_number int4 NULL, -- 번호
	"name" text NULL, -- 성명
	gender bpchar(1) NULL, -- 성별
	korean int4 NULL, -- 국어
	math int4 NULL, -- 수학
	english int4 NULL, -- 영어
	science int4 NULL, -- 과학
	social int4 NULL, -- 사회
	pe int4 NULL, -- 체육
	art int4 NULL -- 미술
);
COMMENT ON TABLE students IS '학생 성적 정보 테이블 (입학년도, 학년, 반, 번호, 성명, 성별, 국어, 수학, 영어, 과학, 사회, 체육, 미술)';

-- Column comments

COMMENT ON COLUMN students.enrollment_year IS '입학년도';
COMMENT ON COLUMN students.grade IS '학년';
COMMENT ON COLUMN students."class" IS '반';
COMMENT ON COLUMN students.student_number IS '번호';
COMMENT ON COLUMN students."name" IS '성명';
COMMENT ON COLUMN students.gender IS '성별';
COMMENT ON COLUMN students.korean IS '국어';
COMMENT ON COLUMN students.math IS '수학';
COMMENT ON COLUMN students.english IS '영어';
COMMENT ON COLUMN students.science IS '과학';
COMMENT ON COLUMN students.social IS '사회';
COMMENT ON COLUMN students.pe IS '체육';
COMMENT ON COLUMN students.art IS '미술';
