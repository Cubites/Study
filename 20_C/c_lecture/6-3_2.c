#include <stdio.h>

// �μ��� ���� 99�� �Ǵ� �� ���ϱ�
//   A Z
// + Z A
// -----
//   9 9

main()
{
	int a = 0;
	int z;
	while (a <= 9) {
		z = 9 - a;
		printf("%d%d + %d%d = 99\n\n", a, z, z, a);
		a += 1;
	}
}