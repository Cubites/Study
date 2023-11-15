#include <stdio.h>

int Factorial(int n)
{
	printf("n = %d\n", n);

	if (n == 0) return 1;
	else 
		return n * Factorial(n - 1);
}

main()
{
	int num = 0;

	while (1) {
		printf("factorial nbr = ");
		scanf_s("%d", &num);

		printf("\n%d! = %d\n\n", num, Factorial(num));
	}
}