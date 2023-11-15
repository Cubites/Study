#include <stdio.h>

// 두수의 합이 99가 되는 수 구하기
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