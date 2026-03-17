export const POLICY_CONTENT = {
  'personal-information': {
    title: '개인정보 처리방침',
    content: (
      <div
        style={{
          fontFamily: 'Pretendard',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>개인정보 처리방침</h1>

        <p style={{ marginBottom: '15px' }}>
          소소(소중한 소품샵)(이하 "소소" 또는 "당사")은 이용자의 개인정보를 보호하고, 관련 법령을 준수하기 위하여
          다음과 같이 개인정보 처리방침을 수립합니다. 본 개인정보 처리방침은 앱 이용과 관련된 개인정보의 수집, 이용,
          제공, 보관 및 보호 조치 등을 포함합니다.
        </p>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          1. 수집하는 개인정보 항목 및 수집 방법
        </h2>
        <p style={{ marginBottom: '10px' }}>당사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.</p>

        <ol style={{ marginLeft: '20px', marginBottom: '15px' }}>
          <li style={{ marginBottom: '15px' }}>
            <strong style={{ fontWeight: 'bold' }}>회원가입 및 로그인</strong>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li style={{ margin: '5px 0' }}>수집 항목: 이메일 주소 (Google 로그인 연동 시)</li>
              <li style={{ margin: '5px 0' }}>수집 방법: Google SNS 로그인</li>
            </ul>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong style={{ fontWeight: 'bold' }}>위치 정보 이용</strong>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li style={{ margin: '5px 0' }}>수집 항목: 사용자의 위치 정보</li>
              <li style={{ margin: '5px 0' }}>수집 목적: 사용자 맞춤형 서비스 제공 (예: 근처 매장 정보 제공 등)</li>
              <li style={{ margin: '5px 0' }}>
                수집 방법: 사용자의 명시적인 동의 후 GPS 또는 네트워크 기반 위치 정보 수집
              </li>
            </ul>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong style={{ fontWeight: 'bold' }}>프로필 변경 시</strong>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              <li style={{ margin: '5px 0' }}>수집 항목: 갤러리에서 선택한 사진 또는 카메라 촬영 사진</li>
              <li style={{ margin: '5px 0' }}>수집 목적: 프로필 이미지 변경 기능 제공</li>
              <li style={{ margin: '5px 0' }}>수집 방법: 사용자의 명시적인 동의 후 파일 업로드 또는 카메라 사용</li>
            </ul>
          </li>
        </ol>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          2. 개인정보 수집 및 이용 목적
        </h2>
        <p style={{ marginBottom: '10px' }}>수집된 개인정보는 다음과 같은 목적으로 활용됩니다.</p>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
          <li style={{ margin: '5px 0' }}>회원가입 및 본인 인증을 위한 서비스 제공</li>
          <li style={{ margin: '5px 0' }}>사용자 맞춤형 서비스 제공 및 위치 기반 기능 지원</li>
          <li style={{ margin: '5px 0' }}>프로필 이미지 변경 기능 제공</li>
          <li style={{ margin: '5px 0' }}>고객 문의 대응 및 서비스 개선을 위한 분석</li>
          <li style={{ margin: '5px 0' }}>법적 의무 준수를 위한 기록 보관</li>
        </ul>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          3. 개인정보의 보관 및 파기
        </h2>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
          <li style={{ margin: '5px 0' }}>
            당사는 이용자의 개인정보를 <strong style={{ fontWeight: 'bold' }}>회원 탈퇴 시 즉시 파기</strong>하며, 법적
            의무가 있는 경우 관련 법령에 따라 일정 기간 보관할 수 있습니다.
          </li>
          <li style={{ margin: '5px 0' }}>
            이용자의 개인정보는 전자적 파일 형태로 저장되며, 안전한 보안 시스템을 통해 보호됩니다.
          </li>
          <li style={{ margin: '5px 0' }}>보관 기간이 종료되거나 이용 목적이 달성된 개인정보는 즉시 파기됩니다.</li>
        </ul>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          4. 개인정보 제3자 제공 및 위탁
        </h2>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
          <li style={{ margin: '5px 0' }}>
            당사는 이용자의 개인정보를 원칙적으로{' '}
            <strong style={{ fontWeight: 'bold' }}>외부에 제공하지 않습니다.</strong> 다만, 법령에 따라 요구되는 경우
            또는 이용자가 사전 동의한 경우에 한해 제공될 수 있습니다.
          </li>
          <li style={{ margin: '5px 0' }}>
            서비스 운영을 위해 필수적인 업무를 외부 업체에 위탁할 경우, 개인정보 보호를 위한 조치를 철저히 준수합니다.
          </li>
        </ul>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          5. 개인정보 보호를 위한 보안 조치
        </h2>
        <p style={{ marginBottom: '10px' }}>당사는 이용자의 개인정보 보호를 위해 다음과 같은 조치를 시행합니다.</p>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
          <li style={{ margin: '5px 0' }}>개인정보 암호화 및 접근 권한 최소화</li>
          <li style={{ margin: '5px 0' }}>보안 시스템을 통한 해킹 및 악성코드 방지</li>
          <li style={{ margin: '5px 0' }}>개인정보 접근 로그 관리 및 내부 감사 시행</li>
        </ul>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          6. 이용자의 권리 및 행사 방법
        </h2>
        <p style={{ marginBottom: '15px' }}>
          이용자는 언제든지 본인의 개인정보 조회, 수정, 삭제 및 처리 정지를 요청할 수 있습니다. 이러한 요청은 앱 내 설정
          메뉴 또는 고객센터를 통해 가능합니다.
        </p>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          7. 개인정보 보호책임자 및 문의처
        </h2>
        <p style={{ marginBottom: '10px' }}>개인정보 관련 문의 사항이 있으시면 아래의 연락처로 문의해 주세요.</p>
        <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginBottom: '15px' }}>
          <li style={{ margin: '5px 0' }}>담당자: 김재원</li>
          <li style={{ margin: '5px 0' }}>
            이메일:{' '}
            <a href="mailto:tam0202@naver.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
              tam0202@naver.com
            </a>
          </li>
        </ul>

        <h2 style={{ fontSize: '20px', marginTop: '25px', marginBottom: '15px', color: '#333' }}>
          8. 개인정보 처리방침 변경
        </h2>
        <p style={{ marginBottom: '15px' }}>
          본 개인정보 처리방침은 관련 법령 및 서비스 정책 변경에 따라 수정될 수 있으며, 변경 시 앱을 통해 공지됩니다.
        </p>
      </div>
    ),
  },
  location: {
    title: '위치 기반 서비스 이용 약관',
    content: (
      <div
        style={{
          fontFamily: 'Pretendard',
          lineHeight: 1.6,
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>위치기반서비스 이용약관</h1>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>제1조 (목적)</h2>
          <p style={{ marginBottom: '15px' }}>
            본 약관은 소소(소중한 소품샵)(이하 "당사")이 제공하는 위치기반서비스(이하 "서비스")와 관련하여, 당사와
            이용자의 권리·의무 및 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제2조 (서비스의 내용)
          </h2>
          <p style={{ marginBottom: '10px' }}>
            당사는 이용자의 동의를 바탕으로 아래와 같은 위치기반서비스를 제공합니다.
          </p>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>
              이용자의 현재 위치를 활용한 맞춤형 서비스 제공 (예: 주변 매장 정보 제공)
            </li>
            <li style={{ margin: '5px 0' }}>기타 이용자의 위치를 기반으로 하는 서비스 제공</li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제3조 (위치정보의 수집 및 이용목적)
          </h2>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>
              당사는 이용자의 단말기 GPS, Wi-Fi, 네트워크 정보를 이용하여 위치정보를 수집합니다.
            </li>
            <li style={{ margin: '5px 0' }}>
              수집된 위치정보는 다음과 같은 목적으로 활용됩니다.
              <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginTop: '5px' }}>
                <li style={{ margin: '5px 0' }}>이용자의 현 위치를 기반으로 한 서비스 제공</li>
                <li style={{ margin: '5px 0' }}>맞춤형 콘텐츠 및 추천 서비스 제공</li>
                <li style={{ margin: '5px 0' }}>기타 이용자가 동의한 목적 내에서의 활용</li>
              </ul>
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제4조 (위치정보 이용 및 보유기간)
          </h2>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>
              이용자의 위치정보는{' '}
              <strong style={{ fontWeight: 'bold' }}>서비스 제공을 위한 최소한의 기간 동안만 저장</strong>되며, 목적
              달성 후 즉시 삭제됩니다.
            </li>
            <li style={{ margin: '5px 0' }}>
              단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 법령을 준수하여 보관합니다.
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제5조 (위치정보의 제공 및 공유)
          </h2>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>당사는 원칙적으로 이용자의 위치정보를 외부에 제공하지 않습니다.</li>
            <li style={{ margin: '5px 0' }}>
              단, 이용자가 명시적으로 동의한 경우 또는 법령에 따라 요청이 있는 경우에 한하여 제공될 수 있습니다.
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제6조 (이용자의 권리 및 변경·삭제 요청)
          </h2>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>이용자는 언제든지 본인의 위치정보 수집 및 이용을 철회할 수 있습니다.</li>
            <li style={{ margin: '5px 0' }}>
              위치정보 제공 동의를 철회하고자 하는 경우, 앱 내 설정에서 해당 기능을 비활성화하거나 고객센터를 통해
              요청할 수 있습니다.
            </li>
            <li style={{ margin: '5px 0' }}>
              이용자는 위치정보를 변경 또는 삭제 요청할 수 있으며, 당사는 요청을 받은 즉시 이를 반영합니다.
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제7조 (책임 제한)
          </h2>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>
              당사는 천재지변, 네트워크 장애 등 불가항력적인 사유로 인해 서비스 제공이 불가능한 경우, 이에 대한 책임을
              지지 않습니다.
            </li>
            <li style={{ margin: '5px 0' }}>
              이용자의 부주의로 인한 개인정보 유출 및 위치정보 오남용에 대해 당사는 책임을 지지 않습니다.
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            제8조 (분쟁 해결 및 관할 법원)
          </h2>
          <ol style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <li style={{ margin: '5px 0' }}>
              본 약관과 관련하여 분쟁이 발생할 경우, 이용자와 당사는 협의를 통해 해결하도록 노력합니다.
            </li>
            <li style={{ margin: '5px 0' }}>
              협의가 이루어지지 않을 경우, 관련 법령 및 절차에 따라 관할 법원을 통해 해결합니다.
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>부칙</h2>
          <p style={{ marginBottom: '15px' }}>
            본 약관은 <strong style={{ fontWeight: 'bold' }}>[YYYY년 MM월 DD일]</strong>부터 시행됩니다.
          </p>
        </div>
      </div>
    ),
  },
}
