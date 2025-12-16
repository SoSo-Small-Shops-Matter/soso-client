export const convertToFormData = (data?: Record<string, any>) => {
  if (!data) return

  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    // 1. 값이 배열인 경우 (File 배열이든 일반 배열이든) 처리
    if (Array.isArray(value)) {
      // 빈 배열이면 추가하지 않고 다음 항목으로 넘어갑니다.
      if (value.length === 0) {
        return
      }

      // 배열의 모든 요소를 반복하여 처리
      value.forEach((item, index) => {
        // 배열 요소가 파일(File/Blob)인 경우
        if (item instanceof File || item instanceof Blob) {
          // 파일은 키를 반복하여 추가 (서버에서 배열로 인식)
          formData.append(key, item)
        }
        // 배열 요소가 일반 데이터(문자열, 숫자, 객체 등)인 경우
        else {
          let appendedValue
          // 객체인 경우 JSON.stringify
          if (typeof item === 'object' && item !== null) {
            appendedValue = JSON.stringify(item)
          } else {
            // 원시 값(숫자, 문자열 등)은 그대로 사용
            appendedValue = item
          }

          // 일반 배열은 인덱스 키 형태로 추가 (예: key[0], key[1])
          formData.append(`${key}[${index}]`, appendedValue)
        }
      })

      // 2. 값이 File/Blob 인스턴스인 경우 (단일 파일)
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)

      // 3. 값이 일반 객체인 경우 (배열, 파일, Blob이 아닐 때)
    } else if (typeof value === 'object' && value !== null) {
      // 일반 객체는 JSON 문자열로 변환하여 추가
      formData.append(key, JSON.stringify(value))

      // 4. 그 외의 원시 값 (문자열, 숫자, boolean 등)
    } else {
      formData.append(key, value)
    }
  })

  return formData
}
