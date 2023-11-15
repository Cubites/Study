#include <stdio.h>

// 전역변수
//int total = 0;

int AddTotal(int num);

main()
{
	int i, num;

	for (i = 0; i < 3; i++) {
		printf("입력 %d = ", i + 1);
		scanf_s("%d", &num);

		printf("누적 = %d \n\n", AddTotal(num));
	}
	// printf("total = %d \n\n", total);
}

int AddTotal(int num) {
	// 전역변수를 없애는 방법
	static int total = 0; // 처음 한번만 초기화 됨(지역변수의 성격을 가지지만, 전역변수처럼 사용할 수 있음)

	total += num;
	return total;
}