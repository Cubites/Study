#include <stdio.h>

// 구구단 출력 문제
// 2, 4, 6, 8 단만 출력
// 2단은 2*2까지, 4단은 4*4까지, ... 8단은 8*8단 까지 출력

main()
{
	int n = 0;
	while (1) {
		n += 1;
		if (n % 2 == 1) {
			continue;
		}
		else {
			for (int m = 1; m <= n; ++m) {
				if (n % 2 == 1) {
					continue;
				}
				else {
					printf("%d * %d = %d\n", n, m, n * m);
				}
			}
			printf("\n");
		}
		if (n >= 8) {
			break;
		}
	}
}