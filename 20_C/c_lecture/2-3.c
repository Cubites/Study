#include <stdio.h>

main()
{
	int num1, num2, sum;

	num1 = 10; num2 = 20;
	sum = 0;

	// 산술연산자
	printf("\n산술연산자\n");
	printf("num1 = %d num2 = %d \n", num1, num2);
	printf("num1 += num2 --> %d \n", num1 += num2);

	// 증감연산자
	printf("\n증감연산자\n");
	printf("num1 = %d \n", num1);
	printf("++num1 = %d \n", ++num1);
	printf("num1 = %d \n", num1);
	printf("num1++ = %d \n", num1++);
	printf("num1 = %d \n", num1);
	
	// 우선순위
	printf("\n 우선순위 예제\n");
	printf("num1=%d num2=%d \n", num1, num2);
	printf("num1=%d num2=%d, 순위연산=%d \n", num1, num2, (++num1 + num2++));

	// 비트연산
	printf("\n비트연산자\n");
	num1 = 5, num2 = 6;

	// num1 = 0000 0101 (5)
	// num2 = 0000 0110 (6)
	// num1 & num2
	// 0000 0101 (5)
	// 0000 0110 (6)
	// ---------
	// 0000 0100 (4)
	printf("num1 & num2 = %d \n", num1 & num2);
	
	// 3항연산자
	printf("\n3항연산자\n");
	printf("num1 = %d \n", num1);
	printf("num1의 값이 10보다 적은가 ? : %c \n", num1 < 10 ? 'Y' : 'N');

}