#include <stdio.h>

// �Ҽ� �Ǻ�

main()
{
	int a;
	printf("���� �Է��Ͻÿ� : ");
	scanf_s("%d", &a);

	for (int n = 2; n <= a; n++) {
		for (int m = 2; m <= n; m++) {
			if(n == m) {
				printf("���� %d�� �Ҽ� �Դϴ�.\n\n", n);
			}
			else if (n % m == 0) {
				printf("���� %d�� %d�� ���������Ƿ� �Ҽ��� �ƴմϴ�.\n\n", n, m);
				break;
			}
		}
	}
}