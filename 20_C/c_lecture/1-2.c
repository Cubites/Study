#include <stdio.h>

#define PRODUCT(X, Y) ((X)*(Y))

void sprint();

int main(void)
{
	int i = 10, j = 20;

	// 매크로 전처리기 실행
	printf("i * j = %d\n\n", PRODUCT(i, j));


	// sprint 함수를 호출합니다.
	sprint();

	printf("C언어의 기본구조를 익히는 프로그램입니다.\n\n");

	return 0;
}

void sprint()
{
	printf("sprint 함수에서 출력했습니다.\n\n");
}