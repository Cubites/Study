#include <stdio.h>

#include <stdio.h>
#include <limits.h>

main()
{
	/* --------------------------------------------
		ANSI/ISO C 표준
		------------------------------------------- */
	// short는 최소 16bit 가 되어야 하며, long은 적어도 int보다는 크며,
	// 32bit 보다는 작지 않아야 한다.
	
	typedef long int Lint;
	typedef short int Sint;
	typedef unsigned short int USint;

	// 위와 같이 시로운 자료형을 재정의하여 사용할 수 있다.
	// long int는 long과 같은 크기라는 의미이며,
	// short int는 short라고 쓰는 것과 같은 의미입니다.

	printf("Lint = %d byte \n", sizeof(Lint));
	printf("Sint = %d byte \n", sizeof(Sint));
	printf("USint = %d byte \n", sizeof(USint));
	printf("int = %d byte \n", sizeof(int));
	printf("long = %d byte \n\n", sizeof(long));

	// 위와 같이 sizeof 연산자를 이용하여 현재 시스템에서 각 자료형의
	// 크기를 알아볼 수 있다. (아래는 일반적인 데이터 크기)
	// 16bit cpu - short int (16), int(16), long int (32)
	// 32bit cpu - short int (16), int(32), long int (32)
	// 64bit cpu - short int (16), int(32), long int (64)

	Lint num1 = 10;
	Sint num2 = 20;
	// 실제로 값이 저장되는 위치를 알 수 있다.
	printf("num1의 주소 = %p 저장된 값 = %d \n\n", num1, num1);
	printf("num2의 주소 = %p 저장된 값 = %d \n\n", num2, num2);
}