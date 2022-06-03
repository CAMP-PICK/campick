# CAMPIC
![CAMPIC 로고](/logo.png)<br>
최근 **hot**한 트렌드 중 하나인 캠핑! 많은 분들이 **지친 일상에서 벗어나 힐링**을 하기 위해 캠핑을 떠나고 있는데요. <br> 캠핑 전문가도, 캠린이도 모두 **CAMPICK**과 함께라면 캠핑을 떠날 준비는 걱정 없습니다! <br> 필요한 물품은 모두 이 곳에서 구매해보세요🤩<br>
[쇼핑몰 바로 가기](http://kdt-sw2-seoul-team01.elicecoding.com/)

# 서비스 구성 안내
## 1. 서비스 소개
### **기술 스택**
![Git](https://img.shields.io/badge/-Git-black?&style=for-the-badge&logo=git)
![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?&style=for-the-badge&logo=visual-studio-code)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?&style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?&style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f1e05a?&style=for-the-badge&logo=javascript&logoColor=white)
![Bulma CSS](https://img.shields.io/badge/Bulma-00d1b2?&style=for-the-badge&logo=bulma&logoColor=white)


![Node.JS](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)
![Express.JS](https://img.shields.io/badge/-Express.JS-57606a?&style=for-the-badge&logo=Express.JS)
![MongoDB](https://img.shields.io/badge/MongoDB-black?&style=for-the-badge&logo=mongodb&logoColor=green)
![Multer](https://img.shields.io/badge/Multer-black?&style=for-the-badge&logoColor=white)

### **엔드유저에게 보이는 웹서비스에 대한 소개**
**사용자 관련**
  - 상단 nav bar를 통해 다양한 메뉴를 사용할 수 있습니다.
  - 회원가입/로그인/로그아웃/회원 정보수정/회원탈퇴 기능을 사용할 수 있습니다.
  - 관리자 계정으로 로그인하면 상품 관리/카테고리 관리/주문 관리를 할 수 있습니다.
  - 일반 사용자 계정으로 로그인하면 주문 조회 및 취소를 할 수 있습니다.

**상품 관련**
  - 카테고리 별로 상품을 조회할 수 있고 전체 상품을 조회할 수 있습니다.
  - 이름순 정렬/가격순 정렬/최신 등록 순 정렬하여 상품을 조회할 수 있습니다.
  - 상품 목록에서 원하는 상품을 클릭하면 상세 정보를 볼 수 있습니다.
  - 상품 상세 정보 페이지에서 장바구니에 담거나 바로 구매를 할 수 있습니다.
  - 장바구니에 담긴 상품들의 수량과 상품을 조절 및 선택하여 구매 할 수 있습니다.

**주문 관련**
  - 배송을 위한 정보를 입력한 뒤 주문을 할 수 있습니다.
  - 주문이 완료되면 주문 완료 페이지로 이동됩니다.
  - 사용자는 회원정보 메뉴에서 주문 내역을 확인할 수 있고 주문 취소를 할 수 있습니다.
  - 관리자는 사용자들의 주문 내역을 모두 조회하고 수정하고 삭제할 수 있습니다.
## 2. 서비스 구성도
  **일반 사용자**
  ![일반_사용자](/uploads/3da6243b7b9d835582f8e61db6515bf8/일반_사용자.png)
  
  **관리자**
  ![관리자](/uploads/9dbc697e670304083d97ca4f4220e778/관리자.png)<br>
## 3. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 지재영 | 팀장 / 백엔드 개발 |
| 신승철 | 백엔드 개발 |
| 임연주 | 프론트엔드 개발 |
| 조영환 | 프론트엔드 개발 |
| 최지연 | 프론트엔드 개발 |

**멤버별 responsibility**
1. 지재영: 팀장 / 백엔드 담당 
    - BE : 상품 관련 CRUD API, 카테고리 관련 CRUD API, multer-gcs 기능 구현 및 프론트 작업, VM 배포
    - FE : 상품 수정 페이지 구현, 카테고리 관리 페이지 구현, 상품 정렬 기능 구현
2. 신승철: 백엔드 담당
    - BE : 사용자 관련 CRUD API, 주문 관련 CRUD API 구현, 카카오 로그인 API 연결
    - FE : TOP버튼 만들기
3. 임연주: 프론트엔드 담당
    - FE: 사용자 및 관리자 관련 페이지 CRUD, HOME 페이지, 상품 상세 페이지, 로딩 스피너 기능 구현, 전반적인 CSS 작업
4. 조영환: 프론트엔드 담당
    - FE: 상품 관련 페이지 CRUD 구현, 전반적인 CSS 작업
5. 최지연: 프론트엔드 담당
    - FE: 장바구니 페이지 CRUD, 주문 관련 페이지 CRUD 구현
