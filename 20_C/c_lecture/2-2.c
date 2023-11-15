#include <stdio.h>
// #pragma warning(disable:4996)

buffer_clear()
{
	while (getchar() != '\n');
}

main()
{
	// getchar() : 한문자를 입력받는 함수
	// gets()    : 문자열 입력함수
	// scanf()   : 다양한 자료형을 입력받는 함수

	char gender, married;
	int salary;

	printf("성별 ? (여성:w, 남성:m) ");
	gender = getchar();

	// getchar() 첫번째 예제
	// 아래의 getchar() 은 Enter Key (return 값)을 읽어들여서 정상적으로 수행이 되지 않음

	// 정상적인 수행을 위해서는 입력버퍼에 남겨진 내용을 읽어들여 버퍼의 내용을 clear 해주는 것이 필요하다.

	buffer_clear();

	printf("결혼 ? (기혼:y, 미혼:n) ");
	married = getchar();

	printf("월급 ? ");
	scanf("%d", &salary);

	printf("성별 = %c 결혼 = %c 월급 = %d \n\n", gender, married, salary);
}