#include <stdio.h>

// ������ ��� ����
// 2, 4, 6, 8 �ܸ� ���
// 2���� 2*2����, 4���� 4*4����, ... 8���� 8*8�� ���� ���

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