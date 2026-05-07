'use client'

import LoginInfo from '@/app/my/setting/components/LoginInfo'
import LinkButton from '@/shared/components/button/LinkButton'
import Divider from '@/shared/components/divider/Divider'
import LinkIcon from '@/shared/components/icons/LinkIcon'
import Flex from '@/shared/components/layout/Flex'
import Header from '@/shared/components/layout/Header'
import { useDialog } from '@/shared/context/DialogContext'
import { useToast } from '@/shared/context/ToastContext'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useRouter } from 'next/navigation'

export default function SettingPage() {
  const { clearToken } = useAuthStore()
  const { openDialog, closeDialog } = useDialog()
  const { openToast } = useToast()
  const router = useRouter()

  const handleOpenLogoutModal = () => {
    openDialog({
      type: 'confirm',
      title: '로그아웃 하시겠습니까?',
      onConfirm: handleLogout,
    })
  }

  const handleLogout = () => {
    clearToken()
    closeDialog()
    router.push('/login')
    openToast({
      message: '로그아웃되었습니다.',
    })
  }

  return (
    <div>
      <Header title="설정" type="back" />
      <LoginInfo />
      <Divider height="10px" />
      <Flex direction="col">
        <LinkButton title="공지사항" link="/my/setting/notice" icon={<LinkIcon />} />
        <LinkButton title="피드백 및 문의" link="/my/setting/feedback" icon={<LinkIcon />} />
        <Divider height="10px" />
        <LinkButton title="이용약관" link="/my/setting/policy" icon={<LinkIcon />} />
        <LinkButton
          title="버전"
          link="/my/setting/feedback"
          icon={<span className="text-main font-body_m">1.0</span>}
          className="cursor-default"
          disabled
        />
        <Divider height="10px" />
        <LinkButton onClick={handleOpenLogoutModal} title="로그아웃" icon={<LinkIcon />} />
        <LinkButton link="/my/setting/unsubscribe" title="탈퇴하기" icon={<LinkIcon />} />
      </Flex>
    </div>
  )
}
