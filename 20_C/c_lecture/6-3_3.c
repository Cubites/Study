#include <stdio.h>

// 소수 판별

main()
{
	int a;
	printf("값을 입력하시오 : ");
	scanf_s("%d", &a);

	for (int n = 2; n <= a; n++) {
		for (int m = 2; m <= n; m++) {
			if(n == m) {
				printf("숫자 %d는 소수 입니다.\n\n", n);
			}
			else if (n % m == 0) {
				printf("숫자 %d는 %d로 나누어지므로 소수가 아닙니다.\n\n", n, m);
				break;
			}
		}
	}
}