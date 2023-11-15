#include <stdio.h>

main()
{
	char ch1 = 'y', ch2 = 'e', ch3 = 's';

	printf("putchar = ");
	putchar(ch1); putchar(ch2); putchar(ch3);
	putchar('\n');

	// put()함수는 문자열을 표준출력장치인 stdout(터미널)에 출력한다.
	printf("puts = ");
	puts("yes yes \n");

	//printf는 다양한 형식지정자를 통해 여러 종류의 데이터와 백슬래시 문자상수도 출력이 가능하다.
	printf("한줄글자 입력 후 줄바꾸기 \n");
	printf("역슬래시 자체를 출력하기 : \\ \n");
	printf("이중인용부호를 출력하기 : \" \n\n");
}